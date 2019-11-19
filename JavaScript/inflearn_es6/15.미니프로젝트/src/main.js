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
      if (targetClassName !== 'like' && targetClassName !== 'unlike') return;


      const postTitle = target.previousElementSibling.textContent;

      // 찜 취소를 클릭한 경우에, 찜하기로 다시 변경하고, 찜목록을 제거하고, 찜목록 뷰를 렌더링한다.
      if (targetClassName === 'unlike') {
        target.className = 'like';
        target.innerText = '찜하기';

        this.likedSet.delete(postTitle)
      } else {
        // 찜 된 목록(div)의 클래스를 like에서 unlike로 변경하기.
        target.className = 'unlike';
        target.innerText = '찜취소';
        // 찜 목록에 추가
        this.likedSet.add(postTitle);
      }

      // 내 찜 목록 뷰에 추가
      this.updateLikedList();
    })
  }

  updateLikedList() {
    const ul = document.querySelector('.like-list > ul');
    let likedSum = '';
    this.likedSet.forEach(v => {
      likedSum += `<li> ${v} </li>`
    })
    ul.innerHTML = likedSum
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