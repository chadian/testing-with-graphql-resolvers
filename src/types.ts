/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLField,
  GraphQLUnionType,
  GraphQLInterfaceType,
  GraphQLTypeResolver,
} from 'graphql';

export type Primitive = string | boolean | number;
export type TypeName = string;
export type FieldName = string;
export type FieldReference = [TypeName, FieldName];

export type Resolver = GraphQLFieldResolver<any, any>;
export type ResolverParent = Parameters<GraphQLFieldResolver<any, any>>[0];
export type ResolverArgs = Parameters<GraphQLFieldResolver<any, any>>[1];
export type ResolverContext = Parameters<GraphQLFieldResolver<any, any>>[2];
export type ResolverInfo = Parameters<GraphQLFieldResolver<any, any>>[3];

export type ResolverWrapper = (resolver: GraphQLFieldResolver<any, any>, options: ResolverWrapperOptions) => Resolver;

export type PatchResolverWrapper = (options: ResolverWrapperOptions) => Resolver | undefined;

// A resolvable type is a type that has a "field" that can be resolved by a resolver function
export type ResolvableType = GraphQLObjectType | GraphQLUnionType | GraphQLInterfaceType;

export type ResolvableField = GraphQLField<any, any, any>;

export type ResolverWrapperOptions = {
  resolverMap: ResolverMap;
  type: ResolvableType;
  field: ResolvableField;
  packOptions: PackOptions;
};

export type ResolverMap<TFieldResolver = Resolver, TTypeResolver = GraphQLTypeResolver<any, any>> = {
  [typeName: string]: {
    [fieldName: string]: TFieldResolver;
  } & { __resolveType?: TTypeResolver }; // the convention of using __resolveType on a ResolverMap is borrowed from `graphql-tools`
};

export type PackState = Record<any, any>;

type NonNullDependency = object | string | boolean | symbol | number;
export type PackOptions = {
  state: PackState;
  dependencies: Record<string, NonNullDependency>;
};

export type ResolverMapMiddleware = (map: ResolverMap, packOptions: PackOptions) => ResolverMap;

export type Packed = { resolverMap: ResolverMap; state: PackState };

export type Packer = (
  initialMap: ResolverMap,
  middlewares: ResolverMapMiddleware[],
  packOptions?: Partial<PackOptions>,
) => Packed;
