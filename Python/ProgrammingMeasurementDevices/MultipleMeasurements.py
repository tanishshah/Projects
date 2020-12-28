#Tanish Shah
#The purpose of this code is to try and write a script for running tests and getting measurements 

#import libraries
import pyvisa 
import time

  
#initializing/setting up the code
rm = pyvisa.ResourceManager() #check to see if the '@py' is needed this depends on pyvisa vs visa and how computer is configured to open libraries
print(rm.list_resources())
resource_id = 'USB0::0x0957::0x0607::MY47018348::0::INSTR' #Enter in the resource ID once we get the resource id
x = rm.open_resource(resource_id)


#the function that can be called to measure the temperature
def tempCheck (multimeter):
    temp = float(multimeter.query("MEAS:TEMP?"))
    return (temp)


#the function that can be called to measure the open circuit voltage
def voltCheck (multimeter):
    voltage = float(multimeter.query("MEAS:VOLT:DC?"))
    return (voltage)


#the function to measure capacitance
def capCheck(multimeter):
    cap = float(multimeter.query("MEAS:CAP?"))
    return(cap)

#some function here for internal resistance
def iResistance(multimeter):
    e = float(multimeter.query("MEAS:VOLT:DC?"))
    cont = input("Should I continue?").upper()
    if cont == "Y":
        v = float(multimeter.query("MEAS:VOLT:DC?"))
        i = float(multimeter.query("MEAS:CURR:DC?")) #1 after curr dc
        IR = (e-v)/i
        return(i)
    else:
        return(0)

#Continued measurements
#N for nothing, T for temp, V for voltage, IR for internal resistance, C for capacitance
demand = input("What would you like to measure?").upper()

while demand != "N":
    if demand == "T":
        print("the temp is ")
        print(tempCheck(x))
    elif demand == "C":
        print("the capacitance is ")
        print(capCheck(x))
    elif demand == "IR":
        print("the internal resistance is")
        print(iResistance(x))
    elif demand == "V":
        print("the voltage is ")
        print(voltCheck(x))
    demand = input("What would you like to measure?").upper()





    
