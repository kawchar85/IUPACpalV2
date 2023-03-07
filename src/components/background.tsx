import { Tabs } from '@mantine/core';
import styles from './../../styles/background.module.css'

export default function BackgroundPage() {
	return (
		<div className={styles.container} style={{ marginTop: '-8%' }}>
			<main className={styles.main}>
				<Tabs color="lime" radius="lg" variant="pills" orientation="vertical" defaultValue="terminology">
					<Tabs.List>
						<Tabs.Tab value="terminology">

							{/* <img src="https://img.icons8.com/ios/40/null/dictionary.png" /> */}
							<img width='35' height='35' src="https://i.ibb.co/XXkQ6QP/dictionary-3.png" />
							&nbsp;Terminology</Tabs.Tab>
						<Tabs.Tab value="problem">
							<img width='35' height='35' src="https://i.ibb.co/mXsCjnc/problem.png" />
							&nbsp;Problem</Tabs.Tab>
						<Tabs.Tab value="methodology">
							<img width='35' height='35' src="https://i.ibb.co/0ZRBmBY/flow-chart.png" />
							&nbsp;Methodology</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="terminology" pl="xs">
						<div className={styles.terminology}>
							<h2>Terminology</h2>

							<div className={styles.termCard}>
								<h3>DNA</h3>
								<p>A molecule that carries genetic information.</p>
							</div>
							<div className={styles.termCard}>
								<h3>Complement DNA</h3>
								<p>Complement DNA refers to the pairing of nucleotide bases in DNA through hydrogen bonds.
									Adenine (A) pairs with thymine (T), and cytosine (C) pairs with guanine (G).
									The complementary strand of DNA is formed by matching the base pairs with their
									complementary counterparts. <br /><br />
									For example, if a sequence on one strand reads "ATCG," the complementary strand will
									have a sequence of "TAGC" since A pairs with T and C pairs with G. </p>
							</div>
							<div className={styles.termCard}>
								<h3>String</h3>
								<p>In bioinformatics, a string refers to a sequence of characters that represents a biological molecule,
									such as DNA, RNA, or protein. The characters in a string are typically restricted to a specific alphabet
									of symbols that correspond to the building blocks of the biological molecule. <br /> <br />

									For example, in DNA sequences, the alphabet consists of four symbols, A (adenine), C (cytosine), G (guanine),
									and T (thymine), while in RNA sequences, the alphabet consists of A, C, G, and U (uracil). In protein sequences,
									the alphabet consists of 20 symbols, which correspond to the 20 different amino acids.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Prefix</h3>
								<p>A prefix of a string is any contiguous substring that starts at the beginning of the string. </p>
							</div>

							<div className={styles.termCard}>
								<h3>Suffix</h3>
								<p>A suffix of a string is any contiguous substring that ends at the end of the string.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Degenerate String</h3>
								<p>In bioinformatics, a degenerate string is a sequence of nucleotides or amino acids that contains
									alternative options at one or more positions. These alternatives can arise due to genetic variation
									or the presence of ambiguous bases. </p>
							</div>
							<div className={styles.termCard}>
								<h3>Hamming distance</h3>
								<p>The Hamming distance between two sequences X and Y is defined as the number of positions in which
									the corresponding symbols differ. Mathematically, it is denoted as δH(X, Y) and is calculated as
									the cardinality of the set of all positions i, such that X[i] ≠ Y[i], where X and Y are sequences
									of the same length. <br /> <br />

									For example, let X = "ATCGGT" and Y = "ATCGCT". Then, the Hamming distance between X and Y is 1,
									since only the 5th position differs between the two sequences.</p>
							</div>
							<div className={styles.termCard}>
								<h3>IUPAC Sequence</h3>
								<p>The IUPAC (International Union of Pure and Applied Chemistry) sequence is a type of nucleotide sequence
									that is commonly used in bioinformatics to represent ambiguous or degenerate DNA or RNA sequences.
									<br /><br />

									The IUPAC character set includes the following characters:

									A (Adenine),
									C (Cytosine),
									G (Guanine),
									T (Thymine),
									U (Uracil),
									R (A or G),
									Y (C or T),
									M (A or C),
									K (G or T),
									S (C or G),
									W (A or T),
									B (C, G, or T),
									D (A, G, or T),
									H (A, C, or T),
									V (A, C, or G),
									N (A, C, G, or T)

								</p>
							</div>
							<div className={styles.termCard}>
								<h3>Inverted Repeat</h3>
								<p>An inverted repeat is a DNA sequence followed downstream by its
									reverse complement, potentially with a gap in the centre.
									<img style={{ marginLeft: 200 }} src="/IR-example.png" />
								</p>
							</div>
							<div className={styles.termCard}>
								<h3>Palindrome</h3>
								<p>A sequence of nucleotides that reads the same forward and backward.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Maximal Palindrome</h3>
								<p>A palindrome that cannot be extended to the left or right without breaking the palindrome condition.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Suffix Array</h3>
								<p>A suffix array is a data structure that contains all the suffixes of
									a given string, sorted in lexicographical order. The suffix array provides a
									compact representation of all suffixes in the string and can be used to solve
									a wide range of string problems efficiently. It allows fast pattern matching,
									substring searches, and other string-related operations.  </p>
							</div>
							<div className={styles.termCard}>
								<h3>LCP array</h3>
								<p>Longest Common Prefix (LCP) array is a data structure that represents the length
									of the longest common prefix between consecutive suffixes in a suffix array. </p>
							</div>

							{/* <div className={styles.termCard}>
								<h3></h3>
								<p></p>
							</div> */}
						</div>
					</Tabs.Panel>

					<Tabs.Panel value="problem" pl="xs">
						<div className={styles.terminology}>
							<h2>Problem Defination</h2>
							<div className={styles.termCard}>
								<h3>Input</h3>
								<p>IUPAC-encoded string x of length n, a natural number k representing the maximum
									number of permitted mismatches, a pair of natural numbers m and M representing
									the minimum and maximum length respectively of the identified inverted repeats,
									and a natural number g specifying the maximum permitted gap size.
								</p>
							</div>
							<div className={styles.termCard}>
								<h3>Output</h3>
								<p>Array of inverted repeats each represented by 4 indexes (a, b, c, d) such that for some
									string w = x[c...d], it is that case that x[a...b] is a complement of w. Additionally,
									the gap c - b - 1 ≤ g and the length of the inverted repeat is within the stated
									bounds i.e. m ≤ b - a + 1 ≤ M and m ≤ d - c + 1 ≤ M.</p>
							</div>

							<div className={styles.termCard}>
								<h3>Solution</h3>
								<p>We present IUPACpal, an exact tool for efcient identifcation of inverted
									repeats in IUPAC-encoded DNA sequences allowing also for potential mismatches and
									gaps in the inverted repeats.</p>
							</div>

						</div>
					</Tabs.Panel>

					<Tabs.Panel value="methodology" pl="xs">

						<div className={styles.content}>
							<h2>Methodology</h2>


							<p>
								<b>Step 1: Preprocessing for Kangaroo Method:</b>
								<ul>
									<li> Create a complement copy of the input DNA sequence.</li>
									<li>Use the Manber-Myers algorithm to construct suffix arrays for the original and complement sequences.</li>
									<li>Precompute the LCP (Longest Common Prefix) array for both suffix arrays by using Kasai's algorithm to help match.</li>
								</ul>

							</p>

							<p>
								<b>Step 2: Identification of Maximal Palindromes:</b>
								<ul>
									<li>Traverse the LCP array for the original sequence.</li>
									<li>For each element in the LCP array, check if the corresponding suffixes in the original sequence form a palindrome.</li>
									<li>To check if a suffix is a palindrome, compare the characters at the start and end of the suffix, then move inwards <br />toward the center until the entire suffix has been checked.</li>
									<li>If the suffix is a palindrome, check if a prefix with the same length within the same LCP range exists.</li>
									<li>If a prefix with the same length within the same LCP range exists, then the substring between the prefix and suffix is a maximal palindrome.</li>
								</ul>

							</p>

							<p>
								<b>Step 3: Identification of Inverted Repeats:</b>
								<ul>
									<li>Iterate over every position in the input sequence.</li>
									<li>For each position, use the Kangaroo method to identify all mismatched pairs equidistant from the current position.</li>
									<li>Calculate only the mismatch locations needed for a given set of parameters to maintain efficiency.</li>
									<li>For each identified mismatched pair, consider a range of gap sizes and extend the inverted repeat to both the left and right, <br />as long as the number of mismatches stays below some maximum value.</li>
								</ul>
							</p>

						</div>


					</Tabs.Panel>

					<Tabs.Panel value="settings" pl="xs">
						Settings tab content
					</Tabs.Panel>
				</Tabs>
			</main>
		</div>
	);
}