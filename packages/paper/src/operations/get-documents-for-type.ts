import { Operation, OperationContext } from '../types';

export const getDocumentsForTypeOperation: Operation = function getDocumentsForTypeOperation(context, type) {
  const { store } = context;
  return store[type];
};

// Only used for generating type after the resulting `bind`
const bound = getDocumentsForTypeOperation.bind(null, {} as OperationContext);
export type ContextualOperation = typeof bound;
