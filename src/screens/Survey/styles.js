import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // flexGrow: 1,
    backgroundColor: '#f2f2f2',
  },
  cardContainer: {
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    elevation: 1,
  },
  surveyTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surveyTitle: {
    fontSize: 40,
    fontWeight: '300',
  },
  questionTitle: {
    fontSize: 30,
    fontWeight: '200',
  },
  questionStatement: {
    fontSize: 30,
    fontWeight: '200',
  },
  questionContentContainer: {
    marginTop: '7%',
    marginBottom: '7%',
  },
  completeContainer: {
    // marginTop: '10%',
    // marginBottom: '10%',
    // marginLeft:
    // margin: '10%',
    // height: 100,
    marginTop: 70,
    marginBottom: 30,
    marginLeft: '20%',
    marginRight: '20%',
  },
  requiredText: {
    color: 'red'
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: 225,
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
