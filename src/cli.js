import { Command } from 'commander';
import { GetOptions } from './options.mjs';
import Conf from 'conf';


const program = new Command();
const config = new Conf({ projectName: 'icex-crypto' });

// Pre-subcommand handler
const preSubcommandHandler = (thisCommand, subCommand) => {
  const thisCommandOpts = thisCommand.opts();
  
  // Set verbose option
  const verbose = !!thisCommandOpts.verbose;
  process.env.BULCON_VERBOSE = verbose.toString();

  // Set option values from command line or config
  const optionKeys = [
    { key: 'rhost', env: 'BULCON_REDIS_HOST' },
    { key: 'rport', env: 'BULCON_REDIS_PORT' },
    { key: 'rpass', env: 'BULCON_REDIS_PASS' },
    { key: 'rmqhost', env: 'BULCON_RMQ_HOST' },
    { key: 'rmqport', env: 'BULCON_RMQ_PORT' },
    { key: 'rmqpass', env: 'BULCON_RMQ_PASS' },
    { key: 'apihost', env: 'BULCON_SERVICE_APIHOST' },
    { key: 'apikey', env: 'BULCON_SERVICE_APIKEY' },
  ];

  optionKeys.forEach(({ key, env }) => {
    const value = thisCommandOpts[key] || config.get(key);
    if (value) {
      process.env[env] = value;
      config.set(key, value);
    }
  });

  const options = GetOptions(true);

  if (verbose) {
    console.log('Inside pre-subcommand handler...');
    console.log(`About to call action handler for subcommand: ${subCommand.name()}`);
    console.log('-- options --');
    console.log(`verbose = ${options.verbose}`);
    console.log(`rhost = ${options.rhost}`);
    console.log(`rport = ${options.rport}`);
    console.log(`rpass = ${options.rpass}`);
    console.log(`rmqhost = ${options.rmqhost}`);
    console.log(`rmqport = ${options.rmqport}`);
    console.log(`rmqpass = ${options.rmqpass}`);
    console.log(`apihost = ${options.apihost}`);
    console.log(`apiurl = ${options.apiurl}`);
    console.log(`apikey = ${options.apikey}`);
  }
};

program
  .name('arma')
  .version('1.3.6')
  .description('CLI to bul worker utilities')
  .option('-v, --verbose', 'output extra debugging')
  .option('--rhost <type>', 'redis host env:\'BULCON_REDIS_HOST\'')
  .option('--rport <type>', 'redis port env:\'BULCON_REDIS_PORT\'')
  .option('--rpass <type>', 'redis pass env:\'BULCON_REDIS_PASS\'')
  .option('--rmqhost <type>', 'rabbit host env:\'BULCON_RMQ_HOST\'')
  .option('--rmqport <type>', 'rabbit port env:\'BULCON_RMQ_PORT\'')
  .option('--rmqpass <type>', 'rabbit pass env:\'BULCON_RMQ_PASS\'')
  .option('--apihost <type>', 'service api host env:\'BULCON_SERVICE_APIHOST\'')
  .option('--apikey <type>', 'service api key env:\'BULCON_SERVICE_APIKEY\'')
  .configureOutput({
    writeErr: (str) => {
      console.error(str);
    },
  })
  .configureHelp({
    sortSubcommands: true,
    subcommandTerm: (cmd) => cmd.name(),
    commandTerm: 'bulcon',
  });

program.hook('preSubcommand', preSubcommandHandler);

program
  .command(urlCommand)
  .command(imgCommand)
  .command(indexCommand);

program.parse(process.argv);