package sorting;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

// 문제 : N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.
// 입력 : 첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 수 주어진다. 이 수는 절댓값이 1,000보다 작거나 같은 정수이다. 수는 중복되지 않는다.
// 출력 : 첫째 줄부터 N개의 줄에 오름차순으로 정렬한 결과를 한 줄에 하나씩 출력한다.

public class BackJoon2750_sortNumbers {

	

	public static void main(String[] args) throws NumberFormatException, IOException {

		Sort sort = new Sort();
		sort.setNumAndArray();
		sort.bubleSort();
		int[] result = sort.getArry();
		
		for(int i : result)
			System.out.println(i);
		

	}

	
}

class Sort {
	private int n;
	private int[] arry;
	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	
	public void setNumAndArray() throws NumberFormatException, IOException { // 수를 입력받는다.
		n = Integer.parseInt(br.readLine());
		arry = new int[n];
		for (int i = 0; i < n; i++) {
			arry[i] = Integer.parseInt(br.readLine());
		}
		
	}
	
	public void bubleSort() { // 내림차순 정렬
		
		for (int i = 0; i < arry.length; i++) { // bubleSort
			for (int j = i; j < arry.length; j++) {
				if (arry[i] < arry[j]) {
					int temp = arry[j];
					arry[j] = arry[i];
					arry[i] = temp;
				}
				
			}
		}
		
	}
	
	public int[] getArry() {
		return arry;
	}
	
	
	
}