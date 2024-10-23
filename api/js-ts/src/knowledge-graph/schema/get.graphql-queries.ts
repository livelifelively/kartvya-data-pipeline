import { ALL_NODES } from './node-fields';
import { ALL_SCALARS } from './scalar-fields';

// Define a type for the node structure to ensure type safety
type NodeField = {
  name: string;
  fields: any; // This will reference either a scalar array or further nested nodes
};

// Define a mapping type for scalar and node arrays
type TypeDefinition = {
  scalar: string[];
  nodes: NodeField[];
};

// Function to generate GraphQL fields
// export function generateGraphQLFields(type: string, level: number): string {
//   // Retrieve the scalar and node array for the given type
//   const scalars = ALL_SCALARS[`${type}__SCALARS`] || [];
//   const nodes = ALL_NODES[`${type}__NODES`] || [];

//   // Start with scalar fields
//   let queryFields = [...scalars];
//   debugger;

//   // Function to add node fields recursively
//   function addNodeFields(nodeArray: NodeField[], currentLevel: number) {
//     if (currentLevel > level) return; // Stop recursion if the current level exceeds the desired level

//     nodeArray.forEach((node) => {
//       const nodeScalars = ALL_SCALARS[`${node.fields}__SCALARS`] || [];
//       const nodeFields = `{ ${nodeScalars.join(' ')} }`;
//       queryFields.push(`${node.name} ${nodeFields}`);

//       // Recurse into the next level if there are further nodes and the level allows
//       if (currentLevel < level) {
//         const subNodes = ALL_NODES[`${node.fields}__NODES`] || [];
//         addNodeFields(subNodes, currentLevel + 1);
//       }
//     });
//   }

//   // Add node fields if level > 0
//   if (level > 0) {
//     addNodeFields(nodes, 1);
//   }

//   // Return a string that represents the GraphQL query fields
//   return `{ ${queryFields.join(' ')} }`;
// }

export function generateGraphQLFields(type: any, level: number): string {
  const scalars = ALL_SCALARS[`${type}__SCALARS`];
  let queryFields = [...scalars];

  function addNodeFields(nodeArray: NodeField[], currentLevel: number, currentQuery: string[]): string[] {
    if (currentLevel > level) return currentQuery;

    nodeArray.forEach((node) => {
      const nodeScalars = ALL_SCALARS[`${node.fields}__SCALARS`];
      if (nodeScalars) {
        const nodeFields = nodeScalars.join(' ');
        const nestedQuery = addNodeFields(ALL_NODES[`${node.fields}__NODES`] || [], currentLevel + 1, nodeScalars);
        currentQuery.push(`${node.name} { ${nestedQuery.join(' ')} }`);
      }
    });

    return currentQuery;
  }

  if (level > 0) {
    queryFields = addNodeFields(ALL_NODES[`${type}__NODES`] || [], 1, queryFields);
  }

  return `{ ${queryFields.join(' ')} }`;
}
