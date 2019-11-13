class Blog {
  constructor() {
    this.setInitVariables();
    this.registerEvents();
    this.likedSet = new Set();
  }

  setInitVariables() {
    this.blogList = document.querySelector('.blogList > ul');
  }

  registerEvents() {
    const startBtn = document.querySelector('.start');
    const dataURL = "/data/data.json";

    startBtn.addEventListener('click', () => {
      this.setInitData(dataURL)
    })

    this.blogList.addEventListener('click', ({target}) => {
      const targetClassName = target.className;
      if (targetClassName !== 'like') return;
      const postTitle = target.previousElementSibling.textContent;
      this.likedSet.add(postTitle);

      this.likedSet.forEach((v) => console.log(v))
    })
  }

  setInitData(dataURL) {
    this.getData(dataURL, this.insertPosts.bind(this))
  }

  getData(dataURL, fn) {
    const oReq = new XMLHttpRequest();

    oReq.addEventListener('load', () => {
      const list = JSON.parse(oReq.responseText).body;
      fn(list)
    });

    oReq.open('GET', dataURL);
    oReq.send()
  }

  insertPosts(list) {
    list.forEach(v => {
      this.blogList.innerHTML += `
        <li>
          <a href=${v.link}>${v.title}</a>
          <div class='like'>찜하기</div>
        </li>
      `;
    })
  }
}

export default Blog;