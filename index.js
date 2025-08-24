import { spawn } from 'child_process';
import path from 'path';
import { clear } from 'console';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import fs from 'fs';
import CFonts from 'cfonts';
import chalk from 'chalk';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

const checkSessionsFolder = () => {
  return fs.existsSync(path.join(__dirname, 'sessions'));
};

const checkCredsFile = () => {
  return fs.existsSync(path.join(__dirname, 'sessions', 'creds.json'));
};

const deleteSessionsFolder = () => {
  fs.rmSync(path.join(__dirname, 'sessions'), { recursive: true });
};

const start = async () => {
  const args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, { 
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'] 
  });
  
  p.on('exit', (code) => {
    console.log(chalk.red(`[!] Process exited with code: ${code}`));
    if (code === 1 || code === 0) start();
  });
};

const runTest = async () => {
  console.log(chalk.green('[~] Running test script...'));
  const p = spawn(process.argv[0], [path.join(__dirname, 'test.js')], { 
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'] 
  });
  
  p.on('exit', (code) => {
    console.log(chalk[code === 0 ? 'green' : 'red'](`[${code === 0 ? '√' : '!'}] Test completed with code: ${code}`));
  });
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

console.clear();
await sleep(300);

CFonts.say('\n  XMCODES-MD', {
  font: 'tiny',
  align: 'left',
  colors: ['cyan'],
  space: false
});

console.log(chalk.gray('-'.repeat(50)));

console.log(chalk.cyanBright('  Simple WhatsApp Bot with Pairing Code Authentication'));
console.log(chalk.gray('-'.repeat(50)));

console.log(chalk.yellow('\n  Contact Info:'));
console.log(chalk.white(`  Instagram: ${chalk.cyan('https://instagram.com/maximusstore.id')}`));
console.log(chalk.white(`  Facebook:  ${chalk.cyan('https://facebook.com/maximusstoreindonesia')}`));
console.log(chalk.white(`  WhatsApp:  ${chalk.cyan('wa.me/6281283516246')}`));
console.log(chalk.gray('-'.repeat(50)));

const showMenu = () => {
  console.log(chalk.yellow('\n  Select an option:'));
  console.log(chalk.green('  1. Lanjut Menghubungkan'));
  console.log(chalk.green('  2. Run Test Script'));
  console.log(chalk.gray('-'.repeat(30)));
};

if (checkSessionsFolder()) {
  if (!checkCredsFile()) {
    console.log(chalk.yellow('\n[!] Sessions folder found, but creds.json not found'));
    deleteSessionsFolder();
    
    showMenu();
    
    const rl = readline.createInterface({ 
      input: process.stdin, 
      output: process.stdout 
    });
    
    const choice = await promisify(rl.question).bind(rl)(
      chalk.magenta('  ➤ Select: ')
    );
    rl.close();
    
    if (choice === '1') {
      console.log(chalk.green('\n[~] Starting WhatsApp Bot...'));
      start();
    } else if (choice === '2') {
      await runTest();
    } else {
      console.log(chalk.red('\n[!] Invalid choice'));
      process.exit(1);
    }
  } else {
    console.log(chalk.green('\n[√] Found valid session, continuing...'));
    start();
  }
} else {
  console.log(chalk.yellow('\n[!] No sessions folder found'));
  
  showMenu();
  
  const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
  });
  
  const choice = await promisify(rl.question).bind(rl)(
    chalk.magenta('  ➤ Select: ')
  );
  rl.close();
  
  if (choice === '1') {
    console.log(chalk.green('\n[~] Starting WhatsApp Bot...'));
    start();
  } else if (choice === '2') {
    await runTest();
  } else {
    console.log(chalk.red('\n[!] Invalid choice'));
    process.exit(1);
  }
}

console.log(chalk.gray('-'.repeat(50)));
console.log(chalk.cyanBright('  Thank you for using this script!'));
console.log(chalk.gray('-'.repeat(50)));