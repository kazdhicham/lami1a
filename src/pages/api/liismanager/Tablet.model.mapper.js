import { DynamoDbSchema, DynamoDbTable, embed } from '@aws/dynamodb-data-mapper';
import v4 from 'uuid/v4';

class Tablet {
  // Declare methods and properties as usual
}

class TabletMetadata {
  // Methods and properties
}

Object.defineProperty(TabletMetadata.prototype, DynamoDbSchema, {
  value: {
    draft: { type: 'Boolean' },
    tags: {
      type: 'Set',
      memberType: 'String',
    },
  },
});

Object.defineProperties(Tablet.prototype, {
  [DynamoDbTable]: {
    value: 'Tablets',
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: 'String',
        keyType: 'HASH',
        defaultProvider: v4,
      },
      createdAt: {
        type: 'Date',
        keyType: 'RANGE',
      },
      authorUsername: { type: 'String' },
      title: { type: 'String' },
      metadata: embed(TabletMetadata),
    },
  },
});
