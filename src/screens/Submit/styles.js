import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  cardContainer: {
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 0.9,
  },
  numStaged: {
    fontSize: 35,
    textAlign: 'center',
  },
  username: {
    fontSize: 18,
    padding: 20,
  },
  numStagedContainer: {
    padding: 20,
  },
  submitButtonContainer: {
    padding: 50,
    // width: '50%',
  },
  logOutButtonContainer: {
    // width: '100%',
    padding: 50,
    bottom: 30,
  }
});
