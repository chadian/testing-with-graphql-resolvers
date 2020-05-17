import { patchUnionsInterfaces } from '../../../../src/mirage/wrappers/patch-auto-unions-interfaces';
import { expect } from 'chai';
import { generatePackOptions } from '../../../mocks';
import { buildSchema, GraphQLSchema } from 'graphql';
import { ResolverMap } from '../../../../src/types';

describe('mirage/wrappers/patch-auto-unions-interfaces', function () {
  let schema: GraphQLSchema | undefined;

  beforeEach(() => {
    schema = buildSchema(`
      union Salutation = Hello | GutenTag

      type Hello {
        salutation: String!
      }

      type GutenTag {
        salutation: String!
      }

      interface Animal {
        type: String!
      }

      type Dog implements Animal {
        type: String!
        breed: String!
      }

      type Fish implements Animal {
        type: String!
        isFreshwater: Boolean!
      }
    `);
  });

  afterEach(() => {
    schema = undefined;
  });

  it('patches missing union and interface __resolveType resolvers', async function () {
    const resolverMap: ResolverMap = {};
    expect(resolverMap?.Salutation?.__resolveType).to.not.exist;
    expect(resolverMap?.Animal?.__resolveType).to.not.exist;

    const wrappedResolvers = patchUnionsInterfaces(
      resolverMap,
      generatePackOptions({ dependencies: { graphqlSchema: schema } }),
    );

    expect(wrappedResolvers?.Salutation?.__resolveType).to.exist;
    expect(wrappedResolvers?.Animal?.__resolveType).to.exist;
  });

  it('skips patching already filled union and interface __resolveType resolvers', async function () {
    const resolverMap: ResolverMap = {
      Salutation: {
        __resolveType: (): string => 'noop',
      },
      Animal: {
        __resolveType: (): string => 'noop',
      },
    };

    const wrappedResolvers = patchUnionsInterfaces(
      resolverMap,
      generatePackOptions({ dependencies: { graphqlSchema: schema } }),
    );
    expect(wrappedResolvers).to.deep.equal(resolverMap);
  });
});
