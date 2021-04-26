import { formatFiles, readJson, Tree, visitNotIgnoredFiles, writeJson } from '@nrwl/devkit';
import * as match from 'minimatch';
import { Schema } from './schema';

function sortRecursive(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.sort().map(e => sortRecursive(e));
  }

  if (typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: sortRecursive(value[key]),
        };
      }, {});
  }

  return value;
}

function sortJsonFile(host: Tree, path: string): void {
  if (!host.exists(path)) {
    return;
  }

  writeJson(host, path, sortRecursive(readJson(host, path)));
}

const JsonFilesOfInterest = ['nx.json', 'workspace.json', 'angular.json'];

function sortJsonFiles(host: Tree): void {
  for (const pattern of JsonFilesOfInterest) {
    visitNotIgnoredFiles(host, '', file => {
      if (!match(file, pattern)) {
        return;
      }

      sortJsonFile(host, file);
    });
  }
}

export default async function (host: Tree, schema: Schema) {
  sortJsonFiles(host);
  await formatFiles(host);
}
