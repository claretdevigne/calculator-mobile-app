import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

export default function App() {

  const [mainValue, setMainValue] = useState(0)
  const [secondaryValue, setSecondaryValue] = useState(null)
  const [symbol, setSymbol] = useState(null)

  const handleEraser = () => {
    if (mainValue.length > 1) {
      let arr = Array(...mainValue)
      arr.splice(arr.length - 1, 1)
      setMainValue(arr.join(''))
    } else if (mainValue.length === 1) {
      setMainValue(0)
    }
  }

  const handleSignChange = () => {
    if (mainValue) {
      setMainValue(String(+mainValue * -1))
    }
  } 

  const handleResult = () => {
    if (symbol) {
      switch (symbol) {
        case 'mult':
          setMainValue(+secondaryValue * +mainValue)
          setSecondaryValue(null)
          setSymbol(null)
          break;

        case 'div':
          setMainValue(+secondaryValue / +mainValue)
          setSecondaryValue(null)
          setSymbol(null)
          break;

        case 'subs':
          setMainValue(+secondaryValue - +mainValue)
          setSecondaryValue(null)
          setSymbol(null)
          break;

        case 'add':
          setMainValue(+secondaryValue + +mainValue)
          setSecondaryValue(null)
          setSymbol(null)
          break;

        case 'perc':
          setMainValue(+secondaryValue * (+mainValue / 100))
          setSecondaryValue(null)
          setSymbol(null)
          break;
      
        default:
          break;
      }
    }
  }

  const handleOperation = (operation) => {
    if (secondaryValue && mainValue === false) {
      setSymbol(operation)
    } else if ( secondaryValue && mainValue) {
      switch (operation) {
        case 'mult':
          setSecondaryValue(+secondaryValue * +mainValue)
          setMainValue(0)
          break;

        case 'div':
          setSecondaryValue(+secondaryValue / +mainValue)
          setMainValue(0)
          break;

        case 'subs':
          setSecondaryValue(+secondaryValue - +mainValue)
          setMainValue(0)
          break;

        case 'add':
          setSecondaryValue(+secondaryValue + +mainValue)
          setMainValue(0)
          break;

        case 'perc':
          setSecondaryValue(+secondaryValue + +mainValue)
          setMainValue(0)
          break;
      
        default:
          break;
      }
    } else {
      setSymbol(operation)
      setSecondaryValue(mainValue)
      setMainValue(0)
    }
  }

  const numberKey = (number) => {
    if (mainValue === 0 && number !== "0") {
      setMainValue(number)  
    } else {
      if ( mainValue.length < 10 ) {
        setMainValue(mainValue + number)
      }
    }
  }

  const clearKey = () => {
    setSymbol(null)
    setSecondaryValue(null)
    setMainValue(0)
  }

  return (
    <View style={{ backgroundColor: '#391493', height: '100%' }}>
      <StatusBar/>

      <View style={{ height: '40%', paddingHorizontal: 30, display: 'flex', justifyContent: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            {
              ( symbol === 'mult') ?
                <Text style={{ color: 'white', fontSize: 80}}>×</Text> :
                  ( symbol === 'div' ) ?
                    <Text style={{ color: 'white', fontSize: 80}}>÷</Text> :
                      ( symbol === 'subs' ) ?
                        <Text style={{ color: 'white', fontSize: 80}}>-</Text> :
                          ( symbol === 'add' ) ?
                            <Text style={{ color: 'white', fontSize: 80}}>+</Text> :
                              ( symbol === 'perc' ) ?
                                <Text style={{ color: 'white', fontSize: 80}}>%</Text> :
                                <Text></Text>
            } 
          </View>
          <View>
            <View>
              {
                ( secondaryValue === null ) ?
                  <Text></Text>
                  :
                  <Text style={{ color: 'white', fontSize: 50, fontWeight: '600', textAlign: 'right'}}>{ secondaryValue }</Text>
                
              }
              
            </View>
            <View>
              {
                ( mainValue.length < 6 || mainValue >= 0) ?
                  <Text style={{ color: 'white', fontSize: 70, fontWeight: '600', textAlign: 'right'}}>{ mainValue }</Text>
                :
                  <Text style={{ color: 'white', fontSize: 40, fontWeight: '600', textAlign: 'right'}}>{ mainValue }</Text>
              }
            </View>
          </View>
        </View>
        <View>
          {
            ( symbol === 'mult') ?
            <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'right', color: 'white' }}>{'= ' + ( +secondaryValue * +mainValue )}</Text> :
              ( symbol === 'div' ) ?
              <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'right', color: 'white' }}>{'= ' + ( +secondaryValue / +mainValue )}</Text> :
                  ( symbol === 'subs' ) ?
                  <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'right', color: 'white' }}>{'= ' + ( +secondaryValue - +mainValue )}</Text> :
                      ( symbol === 'add' ) ?
                      <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'right', color: 'white' }}>{'= ' + ( +secondaryValue + +mainValue )}</Text> :
                          ( symbol === 'perc' ) ?
                          <Text style={{ fontSize: 30, fontWeight: '400', textAlign: 'right', color: 'white' }}>{'= ' + ( +secondaryValue * (+mainValue / 100) )}</Text> :
                            <Text></Text>
          }
        </View>
      </View>

      <View style={{ backgroundColor: '#5D2DC8', borderRadius: 30,  height: "60%" }}>
       <View style={{ padding: 30 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#391493', borderRadius: 20, width: '115%'}}>
              <TouchableOpacity onPress={() => clearKey()} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => handleSignChange() } style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>+/-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOperation('perc')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }} >
                <Text style={{ fontSize: 30, color: 'white' }}>%</Text>
              </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
              <TouchableOpacity onPress={() => numberKey('7')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('8')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('9')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }} >
                <Text style={{ fontSize: 30, color: 'white' }}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
              <TouchableOpacity onPress={() => numberKey('4')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('5')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('6')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }} >
                <Text style={{ fontSize: 30, color: 'white' }}>6</Text>
              </TouchableOpacity>
              
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
              <TouchableOpacity onPress={() => numberKey('1')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('2')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('3')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }} >
                <Text style={{ fontSize: 30, color: 'white' }}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
              <TouchableOpacity style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text onPress={() => handleEraser() } style={{ fontSize: 30, color: 'white' }}>⇤</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => numberKey('0')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }}>
                <Text style={{ fontSize: 30, color: 'white' }}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginEnd: 40 }} >
                <Text style={{ fontSize: 30, color: 'white' }}>.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: '#FA6D1A', borderRadius: 20 , height: '100%', width: 50, display: 'flex', flexDirection: 'column'  }}>
            <TouchableOpacity onPress={() => handleOperation('mult')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
              <Text style={{ fontSize: 30, color: 'white' }}>×</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleOperation('div')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
              <Text style={{ fontSize: 30, color: 'white' }}>÷</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleOperation('subs')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
              <Text style={{ fontSize: 30, color: 'white' }}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleOperation('add')} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
              <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleResult()} style={{ height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, color: 'white' }}>=</Text>
            </TouchableOpacity>

            
          </View>

        </View>
        
       </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
