class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    //timer
    this.timerElement = container.querySelector('.timer');
    this.intervalId = null;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      const onKey = event.key;

      if (onKey.toLowerCase() === this.currentSymbol.textContent.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.remove('symbol_current');

    if (this.currentSymbol.classList.contains('symbol_invisible')) {
      this.currentSymbol.classList.remove('symbol_invisible');
    }

    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);

    //timer
    this.startTimer(word.length);
  }

  //timer
  startTimer(seconds) {
    clearInterval(this.intervalId);
    this.timerElement.textContent = seconds * 2;

    this.intervalId = setInterval(() => {
      if (this.timerElement.textContent <= 1) {
        clearInterval(this.intervalId);
        this.fail();
      } else {
        this.timerElement.textContent--;
      }
    }, 1000);
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript'
    ];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  renderWord(word) {
    const wordArray = [...word];

   // Каждая третья буква невидима (белого цвета)
   // ниже в функции .map несколько проверок; return на тек. итерации
   // прекращает выполнение и возвращает результат для тек. элемента
    const html = wordArray
      .map((s, i) => {
        if (i === 0 || i === wordArray.length - 1) {
          return `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`;
        }
        if (i % 3 === 0) {
          return `<span class="symbol symbol_invisible">${s}</span>`;
        }
        return `<span class="symbol">${s}</span>`;
      })
      .join('');

    this.wordElement.innerHTML = html;
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));
