#Tanish Shah
#Basic test for getting the multimeter to read voltages

#import libraries
import pyvisa 
import time

#initializing/setting up the code
rm = pyvisa.ResourceManager()  
print(rm.list_resources())
resource_id = '' #Enter in your resource id here


x = rm.open_resource(resource_id)
#print (multimeter.query('*IDN?'))


#the function that can be called to measure the open circuit voltage
def voltCheck (multimeter):
    voltage = float(multimeter.query("MEAS:VOLT:DC?"))
    return (voltage)

print(voltCheck(x))




