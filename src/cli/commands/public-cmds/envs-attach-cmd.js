/** @flow */
import chalk from 'chalk';
import Command from '../../command';
import { attachEnvs } from '../../../api/consumer';
import type { AttachResults } from '../../../consumer/component-ops/attach-envs';

export default class EnvsAttach extends Command {
  name = 'envs-attach [ids...]';
  description = 'attach workspace environments to components';
  alias = '';
  opts = [
    ['t', 'tester', 'attach workspace test environments to components'],
    ['c', 'compiler', 'attach workspace compiler environments to components']
  ];
  loader = true;

  action([ids]: [string[]]): Promise<AttachResults> {
    return attachEnvs(ids);
  }

  report(attachResults: AttachResults): string {
    const successAttached = attachResults.filter(result => result.attached);
    const successAttachedNames = successAttached.map(val => val.id);

    return `the following components has been attached to the workspace environments:\n${successAttachedNames.join(
      '\n'
    )}`;
  }
}
