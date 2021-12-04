const imgObj = {
  img1: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img2: 'https://images.pexels.com/photos/163550/landscape-scenic-going-to-the-sun-road-rocky-mountains-163550.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img3: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img4: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img5: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img6: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img7: 'https://images.pexels.com/photos/788200/pexels-photo-788200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  img8: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
};

const carousel = document.querySelector('.carousel');
const imgDiv = document.querySelector('.img');
const imageNav = document.querySelector('.img-nav');
const btnOnColor = '#3684cb';
const btnOffColor = '#1462a9';
let currentImgID = 'img1';

// Create circles for each image and give id:
for (let each in imgObj) {
  const circle = document.createElement('div');
  imageNav.appendChild(circle);
  circle.setAttribute('class', 'nav-circle');
  circle.setAttribute('id', each);
}

// Handle circle style:
const styleCircle = (lastCircleElem, currentCircle) => {
  if (lastCircleElem) {
    lastCircleElem.style.width = '5px';
    lastCircleElem.style.height = '5px';
  }
  currentCircle.style.width = '20px';
  currentCircle.style.height = '20px';
}

// Display image
const displayImg = (imageURL, lastID, nextID) => {
  const lastCicleElem = document.querySelector(`#${lastID}`);
  const nextCircleElem = document.querySelector(`#${nextID}`);
  const img = document.createElement('img');
  img.setAttribute('src', imageURL);
  imgDiv.replaceChildren();
  imgDiv.appendChild(img);
  styleCircle(lastCicleElem, nextCircleElem);
}

// Handle clicking left/right buttons:
carousel.addEventListener('click', (e) => {
  const direction = e.target.id;
  const lastImgID = currentImgID.slice(-1);
  if (direction === 'left') {
    currentImgID = lastImgID > 1 ? `img${Number(lastImgID) - 1}`
      : 'img8';
  } else if (direction === 'right') {
    currentImgID = lastImgID < 8 ? `img${Number(lastImgID) + 1}`
      : 'img1';
  }
  const imgURL = imgObj[currentImgID];
  displayImg(imgURL, `img${lastImgID}`, currentImgID);
});

// Handle clicking on nav circles:
imageNav.addEventListener('click', (e) => {
  const imageID = e.target.id;
  const imageURL = imgObj[imageID];
  displayImg(imageURL, currentImgID, imageID);
  currentImgID = imageID;
});

// Next slide
const nextSlide = () => {
  const lastImgID = currentImgID.slice(-1);
  currentImgID = lastImgID < 8 ? `img${Number(lastImgID) + 1}`
      : 'img1';
  const imgURL = imgObj[currentImgID];
  displayImg(imgURL, `img${lastImgID}`, currentImgID);
  console.log('tick!');
}

// Initial Image:
let intervalID;
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
play.addEventListener('click', () => {
  play.style['background-color'] = btnOnColor;
  stop.style['background-color'] = btnOffColor;
  const imgURL = imgObj[currentImgID];
  displayImg(imgURL, 'img8', currentImgID);
  intervalID = setInterval(nextSlide, 2000);
});

stop.addEventListener('click', () => {
  play.style['background-color'] = btnOffColor;
  stop.style['background-color'] = btnOnColor;
  clearInterval(intervalID);
});
