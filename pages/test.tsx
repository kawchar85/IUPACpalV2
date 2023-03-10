import React from 'react'
import { AdminLogin } from 'src/components/admin/adminLogin'
import DisplyResult from 'src/components/displayResult'

const Admin = () => {
	const test = `
Time taken in to find all IR: 97.333000 ms
Sequence name: test
Sequence length is: 11
Start at position: 1
End at position: 11
Minimum length of Inverted Repeat is: 2
Maximum length of Inverted Repeat is: 11
Maximum gap between elements is: 2
Number of mismatches allowed in IR: 2



Inverted Repeats:
1        acgt        4
         |  |
8        tata        5
(Length = 4, Gap = 0 , Mismatch = 2)

1        ac        2
         ||
4        tg        3
(Length = 2, Gap = 0 , Mismatch = 0)

4        ta        5
         ||
7        at        6
(Length = 2, Gap = 0 , Mismatch = 0)

5        ata        7
         |||
11       tat        9
(Length = 3, Gap = 1 , Mismatch = 0)

5        at        6
         ||
8        ta        7
(Length = 2, Gap = 0 , Mismatch = 0)

7        at        8
         ||
11       ta       10
(Length = 2, Gap = 1 , Mismatch = 0)




Search complete!
Total IR Found: 6`;
	return (
		<DisplyResult code={test} cnt={20} />
	)
}

export default Admin