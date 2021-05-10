// import { expect } from 'chai';
import { Store } from '../../src/store';
import { buildSchema } from 'graphql';
import { expect } from 'chai';

const schemaString = `
  schema {
    query: Query
  }

  type Query {
    apps: App
  }

  type Account {
    id: ID!
    email: String!
  }

  type Team {
    id: ID!
    name: String!
    owner: Account!
  }

  union AppOwner = Account | Team

  type App {
    id: ID!
    name: String!
    owner: AppOwner!
    releasedAt: String
    archivedAt: String
  }
`;
const graphqlSchema = buildSchema(schemaString);

describe('happy path', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store(graphqlSchema);
  });

  it('creates a new document', async () => {
    await store.mutate(({ add }) => {
      add('Account', {
        id: '1',
        email: 'windows95@aol.com',
      });
    });

    const account = store.find('Account', (document) => document.id === '1');
    expect(account?.id).to.equal('1');
    expect(account?.email).to.equal('windows95@aol.com');
  });
});
