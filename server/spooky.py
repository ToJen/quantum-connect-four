import qiskit
from qiskit import Aer
from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister
from qiskit import execute
import numpy as np

def board_collapse_string(n) :
  circ = QuantumCircuit(n, n)
  
  for i in range(n) :
    circ.h(i)
  #Applies Hadamard gate on every qubit resulting in equally weighted overall state
  
  circ.measure(range(n), range(n))
  
  backend = Aer.get_backend('qasm_simulator')
  job = execute(circ,backend, shots=1, memory=True)
  result = job.result()
  result_string = result.get_memory(circ)
  
  return result_string[0]
  
