const { execSync } = require('child_process');
const { rmdirSync, readdirSync, unlinkSync } = require('fs');

const exercise = process.argv[2];
if(exercise === 'all') {
  all();
} else {
  test(exercise);
}

function all() {
  const grades = [...Array(6)].map((_, i) => {
    try {
      test(i + 1, false);
      return true;
    } catch{
      return false;
    }
  });

  console.log(`${grades.filter(Boolean).length * 2} / 12`);
}

function test(exercise, exit = true) {
  const checkAndClean = dir => exercise => {
    const folder = `./exercise-${exercise}/${dir}`;
    readdirSync(folder).forEach(file => unlinkSync(`${folder}/${file}`));
    rmdirSync(folder);
  };
  const checkAndCleanHash = dir => exercise => {
    const hashExists = readdirSync(`./exercise-${exercise}/${dir}`)
      .some(file => /^\w+\.\w+\.js$/.test(file));
    if(!hashExists) throw 'Hash missing';
  
    checkAndClean(dir)(exercise);
  };
  
  const directory = new Proxy({ 2: 'build', 3: 'build' }, {
    get(target, prop) {
      const dir = target[prop] || 'dist';
      if(prop === '4') return checkAndCleanHash(dir);
  
      return checkAndClean(dir);
    }
  });
  
  
  try {
    execSync('npx webpack -p --config webpack.config.js', {
      cwd: `./exercise-${exercise}`
    });
    
    directory[exercise](exercise);

    console.log(`Exercise ${exercise} looks good`);

    if(exit) process.exit(0);
  } catch(e) {
    const message = e && e.stdout && e.stdout.toString() || e;
    console.error(`Exercise ${exercise} failed`, message);
    if(exit) process.exit(1);
    throw '';
  }
  
}
