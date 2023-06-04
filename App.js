import { StatusBar } from 'expo-status-bar';
import { HyperFormula } from 'hyperformula';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const options = {
    licenseKey: 'gpl-v3',
  };

  const formulaWithIssues = '=(8 + (SUM(5,B1)))';
  const data = [['10', '20', '=Sheet1!A2 + 5', formulaWithIssues]];

  const hfInstance = HyperFormula.buildEmpty(options);
  hfInstance.addSheet();
  hfInstance.setSheetContent(0, data);

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
