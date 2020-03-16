import { expect } from 'chai';
import { wrapEach } from '../../../src/resolver-map/wrap-each';
import { generateEmptyPackOptions } from '../../mocks';
import * as sinon from 'sinon';

describe('wrapEach', function() {
  let originalResolverMap: any;
  let resolverWrapper: any;
  let resolverMapWrapper: any;
  let wrappedResolverMap: any;

  beforeEach(() => {
    originalResolverMap = {
      Query: {
        // eslint-disable-next-line
        field: sinon.spy(),
      },

      SomeType: {
        // eslint-disable-next-line
        fieldResolverOnSomeType: sinon.spy(),
      },
    };

    resolverWrapper = sinon.spy(resolver => {
      // returns a new function that wraps the existing resolver
      return sinon.spy(resolver);
    });
  });

  it('wraps each individual resolver fn in resolver map', function() {
    resolverMapWrapper = wrapEach(resolverWrapper);
    wrappedResolverMap = resolverMapWrapper(originalResolverMap, generateEmptyPackOptions());

    expect(resolverWrapper.called).to.be.true;
    expect(resolverWrapper.callCount).to.equal(2, 'one wrapper for for each resolver');

    // firstCall for wrapping Query.field
    expect(resolverWrapper.firstCall.args[0]).to.equal(originalResolverMap.Query.field, 'first call first arg matches');
    expect(resolverWrapper.firstCall.args[1].path).to.deep.equal(
      ['Query', 'field'],
      'first call second arg has correct path',
    );

    // secondCall for wrapping SomeType.fieldResolverOnSomeType
    expect(resolverWrapper.secondCall.args[0]).to.equal(
      originalResolverMap.SomeType.fieldResolverOnSomeType,
      'second call first arg matches',
    );
    expect(resolverWrapper.secondCall.args[1].path).to.deep.equal(
      ['SomeType', 'fieldResolverOnSomeType'],
      'second call second arg matches',
    );

    // types of wrapped resolvers are both functions
    expect(typeof wrappedResolverMap.Query.field).to.equal('function');
    expect(typeof wrappedResolverMap.SomeType.fieldResolverOnSomeType).to.equal('function');

    // the original resolvers are not the same as the wrapped ones
    expect(wrappedResolverMap.Query.field).to.not.equal(originalResolverMap.Query.field);
    expect(wrappedResolverMap.SomeType.fieldResolverOnSomeType).to.not.equal(
      originalResolverMap.SomeType.fieldResolverOnSomeType,
    );

    // initially none of the resolvers have been called
    expect(originalResolverMap.Query.field.called).to.equal(false, 'original Query.field has not been called');
    expect(originalResolverMap.SomeType.fieldResolverOnSomeType.called).to.equal(
      false,
      'original SomeType.fieldResolverOnSomeType has not been called',
    );
    expect(wrappedResolverMap.Query.field.called).to.equal(false, 'wrapped Query.field has not been called');
    expect(wrappedResolverMap.SomeType.fieldResolverOnSomeType.called).to.equal(
      false,
      'wrapped SomeType.fieldResolverOnSomeType has not been called',
    );

    // call only wrapped resolvers and they should in turn call the original
    wrappedResolverMap.Query.field();
    wrappedResolverMap.SomeType.fieldResolverOnSomeType();

    // calling the wrapped functions calls the inner function
    // since the function passed to wrapEach wraps the passed in function
    expect(originalResolverMap.Query.field.called).to.equal(true, 'original Query.field has been called');
    expect(originalResolverMap.SomeType.fieldResolverOnSomeType.called).to.equal(
      true,
      'original SomeType.fieldResolverOnSomeType has been called',
    );
    expect(wrappedResolverMap.Query.field.called).to.equal(true, 'wrapped Query.field has been called');
    expect(wrappedResolverMap.SomeType.fieldResolverOnSomeType.called).to.equal(
      true,
      'wrapped SomeType.fieldResolverOnSomeType has been called',
    );

    const argsCalledInOriginalResolvers = [
      originalResolverMap.Query.field.firstCall.args,
      originalResolverMap.SomeType.fieldResolverOnSomeType.firstCall.args,
    ];

    const argsCalledInWrappedResolvers = [
      wrappedResolverMap.Query.field.firstCall.args,
      wrappedResolverMap.SomeType.fieldResolverOnSomeType.firstCall.args,
    ];

    expect(argsCalledInOriginalResolvers).to.deep.equal(argsCalledInWrappedResolvers);
  });
});
