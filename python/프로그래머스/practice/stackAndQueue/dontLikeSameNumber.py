arr = [1,1,3,3,0,1,1]
answer=[1,3,0,1]

# arr = [4,4,4,3,3];
# answer=[4,3];


def solution(arr):
    result = []
    result.append(arr[0])
    for i in range(1, len(arr)):
        if arr[i] != arr[i-1]:
            result.append(arr[i])
    # [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    # print('Hello Python')
    return result

print(solution(arr))

