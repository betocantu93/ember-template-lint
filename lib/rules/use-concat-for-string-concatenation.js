'use strict';

const Rule = require('./base');

const ERROR_MESSAGE = 'Found string concatenation without {{concat}} helper';

module.exports = class UseConcatForStringConcatenation extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        let { attributes } = node;

        let found = attributes.find(AttrNode => {
          return AttrNode.value.type === 'ConcatStatement';
        });
  
        if(!found) { return; }

        this.log({
          message: ERROR_MESSAGE,
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
        });
      },
    };
  }
};