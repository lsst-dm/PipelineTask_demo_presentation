
                        function sleep (time) {
                            return new Promise((resolve) => setTimeout(resolve, time));
                        }
                        class TextScramble {
                          constructor(el) {
                            this.el = el
                            this.chars = '!<>-_\\/[]{}—=+*^?#________'
                            this.update = this.update.bind(this)
                            this.delay = 10
                          }
                          setText(newText) {
                            const oldText = this.el.innerText
                            const length = Math.max(oldText.length, newText.length)
                            const promise = new Promise((resolve) => this.resolve = resolve)
                            this.queue = []
                            for (let i = 0; i < length; i++) {
                              const from = oldText[i] || ''
                              const to = newText[i] || ''
                              const start = Math.floor(Math.random() * 40)
                              const end = start + Math.floor(Math.random() * 40)
                              this.queue.push({ from, to, start, end })
                            }
                            cancelAnimationFrame(this.frameRequest)
                            this.frame = 0
                            this.update()
                            return promise
                          }
                          update() {
                            let output = ''
                            let complete = 0
                            for (let i = 0, n = this.queue.length; i < n; i++) {
                              let { from, to, start, end, char } = this.queue[i]
                              if (this.frame >= end) {
                                complete++
                                output += to
                              } else if (this.frame >= start) {
                                if (!char || Math.random() < 0.0) {
                                  char = this.randomChar()
                                  this.queue[i].char = char
                                }
                                output += `<span class="dud">${char}</span>`
                              } else {
                                output += from
                              }
                            }
                            this.el.innerHTML = output
                            if (complete === this.queue.length) {
                              this.delay = 70
                              this.resolve()
                            } else {
                              setTimeout(function () {
                              this.frameRequest = requestAnimationFrame(this.update)
                              this.frame++
                              }.bind(this), this.delay)
                            }
                          }
                          randomChar() {
                            return this.chars[Math.floor(Math.random() * this.chars.length)]
                          }
                        }
                        
                        const phrases = [
                          'Dynamic'
                        ]

                        var con = true;
                        
                        const el = document.querySelector('.fooBar')
                        const fx = new TextScramble(el)
                        
                        let counter = 0
                        const next = () => {
                          if (con) {
                            fx.setText(phrases[counter]).then(() => {
                              setTimeout(next, 1500)
                            })
                            counter = (counter + 1) % phrases.length
                          }
                        }
                        
                        next()
