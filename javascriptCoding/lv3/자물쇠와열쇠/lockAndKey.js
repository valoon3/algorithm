const rotate = (key) => {
    const m = key.length;
    const newKey = Array.from(Array(m), () => Array(m).fill(null));
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < m; ++j) {
            newKey[i][j] = key[m - 1 - j][i];
        }
    }
    return newKey;
};

function isAnswer(newArr, key_len, arr_len) {
    for (let i = key_len - 1; i <= arr_len - key_len; i++) {
        for (let j = key_len - 1; j <= arr_len - key_len; j++) {
            if (newArr[i][j] !== 1) {
                return false;
            }
        }
    }
    return true;
}

function solution(key, lock) {
    const lock_len = lock.length;
    const key_len = key.length;
    const arr_len = lock_len + key_len * 2 - 2;
    const arr = Array.from(Array(arr_len), () => Array(arr_len).fill(null));

    for (let i = key_len - 1; i <= arr_len - key_len; i++) {
        for (let j = key_len - 1; j <= arr_len - key_len; j++) {
            arr[i][j] = lock[i - key_len + 1][j - key_len + 1];
        }
    }

    for (let rot = 0; rot < 4; rot++) {
        key = rotate(key);

        for (let x = 0; x < lock_len + key_len - 1; x++) {
            for (let y = 0; y < lock_len + key_len - 1; y++) {
                const newArr = arr.map((v) => v.slice());

                for (let i = 0; i < key_len; i++) {
                    for (let j = 0; j < key_len; j++) {
                        if (newArr[x + i][y + j] === 1 && key[i][j] === 1) {
                            newArr[x + i][y + j] = 2;
                        } else if (newArr[x + i][y + j] === 1 && key[i][j] === 0) {
                            newArr[x + i][y + j] = 1;
                        } else if (newArr[x + i][y + j] === 0 && key[i][j] === 1) {
                            newArr[x + i][y + j] = 1;
                        } else {
                            newArr[x + i][y + j] = 0;
                        }
                    }
                }

                if (isAnswer(newArr, key_len, arr_len)) {
                    return true;
                }
            }
        }
    }

    return false;
}

// lv. 3 자물쇠와 열쇠
// 완전탐색 구현 문제