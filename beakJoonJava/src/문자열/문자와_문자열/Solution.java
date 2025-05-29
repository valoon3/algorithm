package 문자열.문자와_문자열;

import java.util.Scanner;

public class Solution {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        String st = sc.next();
        int n = sc.nextInt()-1;

        System.out.println(st.charAt(n));

        sc.close();
    }
}
