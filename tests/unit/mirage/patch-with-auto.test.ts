import { patchWithAutoWrapper } from '../../../src/mirage/wrappers/patch-with-auto';
import { ResolverMap } from '../../../src/types';
import { spy, SinonSpy } from 'sinon';
import { expect } from 'chai';
import { generateEmptyPackOptions } from '../../mocks';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import sinon from 'sinon';

describe('mirage/patch-with-auto', function() {
  let resolverMap: ResolverMap | undefined;
  let schema: GraphQLSchema | undefined;

  beforeEach(() => {
    resolverMap = {
      Query: {
        hello: sinon.spy(),
      },
      Spell: {
        isEvil: sinon.spy(),
      },
    };

    schema = makeExecutableSchema({
      typeDefs: `
        schema {
          query: Query
          mutation: Mutation,
        }

        type Query {
          hello: String
          spells: [Spell!]!
          potions: [Potion!]!
        }

        type Mutation {
          addSpell(spell: Spell!): Spell
        }

        type Spell {
          incantation: String
          isEvil: Boolean
        }

        type Potion {
          name: String!
          ingredients: [String!]!
        }
      `,
    });
  });

  afterEach(() => {
    resolverMap = undefined;
    schema = undefined;
  });

  it('patched missing type field resolvers', async function() {
    expect(resolverMap?.Spell?.incantation).to.not.exist;
    expect(resolverMap?.Potion?.name).to.not.exist;
    expect(resolverMap?.Potion?.ingredients).to.not.exist;

    const wrapper = patchWithAutoWrapper(schema);
    const wrappedResolvers = wrapper(resolverMap!, generateEmptyPackOptions());

    expect(wrappedResolvers?.Spell.incantation).to.exist;
    expect(wrappedResolvers?.Potion.name).to.exist;
    expect(wrappedResolvers?.Potion.ingredients).to.exist;
  });

  it('skips missing root query and mutation field resolvers', async function() {
    expect(resolverMap?.Query.spells).to.not.exist;
    expect(resolverMap?.Query.potions).to.not.exist;
    expect(resolverMap?.Mutation?.addSpell).to.not.exist;

    const wrapper = patchWithAutoWrapper(schema);
    const wrappedResolvers = wrapper(resolverMap!, generateEmptyPackOptions());

    expect(wrappedResolvers?.Query.spells).to.not.exist;
    expect(wrappedResolvers?.Query.potions).to.not.exist;
    expect(wrappedResolvers?.Mutation?.addSpell).to.not.exist;
  });
});
