import { GraphQLSchema, isInterfaceType } from 'graphql';
import { TypeReference, HIGHLIGHT_ALL, HighlighterFactory, Highlighter } from '../types';

export class InterfaceHighlighter implements Highlighter {
  targets: string[];

  constructor(targets: string[]) {
    if (targets.length === 0) {
      targets = [HIGHLIGHT_ALL];
    }

    this.targets = targets;
  }

  mark(schema: GraphQLSchema): TypeReference[] {
    return InterfaceHighlighter.expandTargets(schema, this.targets);
  }

  static expandTargets(schema: GraphQLSchema, targets: string[]): TypeReference[] {
    const interfaceTypeNames = Object.values(schema.getTypeMap())
      .filter(isInterfaceType)
      .map((i) => i.name);

    if (targets.includes(HIGHLIGHT_ALL)) {
      return interfaceTypeNames;
    }

    return interfaceTypeNames.filter((interfaceName) => targets.includes(interfaceName));
  }
}

export const interface_: HighlighterFactory = function type(...interfaceNames: string[]) {
  return new InterfaceHighlighter(interfaceNames);
};
