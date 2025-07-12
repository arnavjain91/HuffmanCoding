let input = "";
let startHuffmanCode = false;
let startCount = 0;
let elementArray;
let textAlpha = 255;
let textCount = 0;
let index = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    elementArray = new ElementArray();
}

function draw() {
    background('#00071a');

    if (startHuffmanCode) {
        if (startCount > 50) {
            if (!elementArray.startShowingTree) {
                if (textAlpha >= 1) {
                    let textString = "";
                    for (let i = 0; i < textCount; i++) {
                        textString += input.charAt(i);
                    }
                    textFont('JetBrains Mono');
                    fill(255, textAlpha);
                    textSize(25);
                    text(textString, width / 2, height / 2, width / 2 - 50);
                    textCount += 0.5;
                }
                if (input.length < textCount - 35) {
                    if (index < input.length) {
                        if (frameCount % 5 == 0) {
                            elementArray.add(input.charAt(index));
                            index++;
                        }
                    }
                    elementArray.show();
                }
                if (index == input.length) {
                    textAlpha -= 10;
                }
                if (textAlpha <= -15) {
                    elementArray.moveArray();
                }
                if (elementArray.upgrad) {
                    elementArray.generateNode();
                }
            } else {
                elementArray.generateTree();
                elementArray.level += 0.05;
                elementArray.showTree(elementArray.elements[0], width / 2, 35, width / 1.15, 1);
                updateCodingTable();
            }
        } else {
            startCount++;
        }
    }
}

function startHuffman() {
    let textArea = document.getElementById("textArea");
    let button = document.getElementById("runButton");

    if (!textArea.classList.contains("hideTextArea")) {
        textArea.classList.add("hideTextArea");
        button.classList.add("hideTextArea");
    }

    startHuffmanCode = true;
    input = textArea.value;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    elementArray.x = width / 4;
}

function updateCodingTable() {
    let tableBody = document.querySelector('#codingTable tbody');
    tableBody.innerHTML = ''; // Clear previous table rows

    if (elementArray.elements.length === 1 && !elementArray.elements[0].isNode) {
        let huffmanCodes = generateHuffmanCode(elementArray.elements[0]);
        
        for (let [char, { freq, code }] of Object.entries(huffmanCodes)) {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${char}</td><td>${freq}</td><td>${code}</td>`;
            tableBody.appendChild(row);
        }
        document.getElementById('huffmanTable').style.display = 'block';
    }
}

function generateHuffmanCode(root) {
    let codes = {};
    function traverse(node, code) {
        if (!node.isNode) {
            codes[node.char] = { freq: node.freq, code: code };
        } else {
            traverse(node.leftchild, code + '0');
            traverse(node.rightchild, code + '1');
        }
    }
    traverse(root, '');
    return codes;
}
