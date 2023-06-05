import { StatusBar } from 'expo-status-bar';
import { HyperFormula } from 'hyperformula';
import { StyleSheet, Text, View } from 'react-native';

function maxDepth(s) {
  let count = 0;
  let st = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') st.push(i); // pushing the bracket in the stack
    else if (s[i] == ')') {
      if (count < st.length) count = st.length;
      // keeping track of the parenthesis and storing
      // it before removing it when it gets balanced
      st.pop();
    }
  }

  return count;
}

export default function App() {
  const options = {
    licenseKey: 'gpl-v3',
  };

  const formulasBroken = [
    'IF((B1>3),"Re-Check Score",((B1/3)*100))',
    '((((A1*B2+((C2/10)/10)/10))))',
    '(A1*B2+((C2/10)/10)/10)',
    '=(8 + (SUM(5,B1)))',
    '=(((8)))',
    '=8 + SUM(5,SUM(1,SUM(1,2)))',
  ];

  formulasBroken.forEach((formula) => {
    console.log('formula depth', formula);
    console.log(maxDepth(formula));
  });

  // const formulaWithIssues = '=(8 + (SUM(5,B1)))';
  const formulaWithIssues = '=8 + SUM(5,SUM(1,8))';
  // const data = [['10', '20', '=Sheet1!A2 + 5', formulaWithIssues]];
  const data = [['=2', '=6']];

  const hfInstance = HyperFormula.buildEmpty(options);
  hfInstance.addSheet();

  try {
    // hfInstance.setSheetContent(0, data);
    console.log('formulaWithIssues', formulaWithIssues);
    const result = hfInstance.calculateFormula(formulaWithIssues, 0);
    console.log({ result });
  } catch (error) {
    console.log({ error });
    // hfInstance.rebuildAndRecalculate();
  }

  const formulas = hfInstance.getAllSheetsFormulas();
  const mySum = hfInstance.getAllSheetsValues();

  console.log(mySum);
  console.log(formulas);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>{JSON.stringify(mySum)}</Text>
      <Text>{JSON.stringify(formulas)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
