function generateRandomNumber(start: number, end: number){
  if(start === undefined){ start = 0; }
  if(end   === undefined){ end   = 100; }
  return Math.floor(Math.random() * end) + start;
}


function delayRAF(){
  return new Promise((resolve, reject) => {
    function delayedCall(){
      resolve(true);
    }
    window.requestAnimationFrame(delayedCall);
  }); // end return promise
}


function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export { generateRandomNumber, delayRAF, capitalizeFirstLetter, lowerCaseFirstLetter  };