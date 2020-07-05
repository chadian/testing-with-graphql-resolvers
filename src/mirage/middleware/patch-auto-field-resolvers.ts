import { GraphQLSchema } from 'graphql';
import { mirageRootQueryResolver } from '../resolvers/root-query';
import { mirageObjectResolver } from '../resolvers/object';
import { ResolverMapMiddleware, ResolverMap } from '../../types';
import { walk } from '../../resolver-map/walk';
import { isRootQueryType, isRootMutationType, isInternalType } from '../../graphql/utils';
import { resolverExistsInResolverMap, addResolverToMap } from '../../resolver-map/utils';
import { IncludeExcludeMiddlewareOptions, defaultIncludeExcludeOptions } from '../../resolver-map/types';
import { PackOptions } from '../../pack';

export function patchAutoFieldResolvers(
  options: IncludeExcludeMiddlewareOptions = defaultIncludeExcludeOptions,
): ResolverMapMiddleware {
  return async (resolverMap: ResolverMap, packOptions: PackOptions): Promise<ResolverMap> => {
    options = {
      ...defaultIncludeExcludeOptions,
      ...options,
    };

    const { include, exclude } = options;

    const graphqlSchema = packOptions.dependencies.graphqlSchema as GraphQLSchema;

    if (!graphqlSchema) {
      throw new Error('graphqlSchema is required in dependencies to patch field resolvers');
    }

    await walk(
      {
        include,
        exclude,
        graphqlSchema,
      },
      async (fieldReference) => {
        const [typeName] = fieldReference;
        const isRootQuery = isRootQueryType(typeName, graphqlSchema);
        const isRootMutation = isRootMutationType(typeName, graphqlSchema);

        if (resolverExistsInResolverMap(fieldReference, resolverMap)) {
          return;
        }

        if (isRootMutation || isInternalType(typeName)) {
          return;
        }

        let resolver;
        if (isRootQuery) {
          resolver = mirageRootQueryResolver;
        } else {
          resolver = mirageObjectResolver;
        }

        addResolverToMap({
          resolverMap: resolverMap,
          fieldReference: fieldReference,
          resolver,
        });
      },
    );

    return resolverMap;
  };
}
