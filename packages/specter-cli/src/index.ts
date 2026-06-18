import { program } from 'commander';
import { scoreCommand } from './commands/score.js';
import { verifyCommand } from './commands/verify.js';
import { watchCommand } from './commands/watch.js';

program
  .name('specter')
  .description('SPECTER Protocol CLI — Know Your Agent (KYA) behavioral reputation scoring')
  .version('1.0.0');

program.addCommand(scoreCommand);
program.addCommand(verifyCommand);
program.addCommand(watchCommand);

program.parse(process.argv);
