


import React from "react";
// import "./styles.css";
import Downshift from 'downshift';

///////// Downshift /////////
/* Downshift was my first implementation of an autocomplete to 
populate the machineInput field, but I ended up using Datalist.
It still exists, for the moment, in case I run into browser 
problems with Datalist.  Did not like this UI design either*/


 
const AutoComplete = ({ machines }) => {
  const machineNames = machines.map(({ name }) => ({ value: name }))

 return (
   <Downshift
   onChange={selection =>
     alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
   }
   itemToString={item => (item ? item.value : '')}
 >
   {({
     getInputProps,
     getItemProps,
     getLabelProps,
     getMenuProps,
     isOpen,
     inputValue,
     highlightedIndex,
     selectedItem,
     getRootProps,
   }) => (
     <div>
       <label {...getLabelProps()}>Pick a Machine </label>
       <div
         style={{display: 'inline-block'}}
         {...getRootProps({}, {suppressRefError: true})}
       >
         <input {...getInputProps()} />
       </div>
       <ul {...getMenuProps()}>
         {isOpen
           ? machineNames
               .filter(item => !inputValue || item.value.includes(inputValue))
               .map((item, index) => (
                 <li
                   {...getItemProps({
                     key: item.value,
                     index,
                     item,
                     style: {
                       backgroundColor:
                         highlightedIndex === index ? 'cyan' : 'green',
                       fontWeight: selectedItem === item ? 'bold' : 'normal',
                     },
                   })}
                 >
                   {item.value}
                 </li>
               ))
           : null}
       </ul>
     </div>
   )}
 </Downshift>
 );
}
 
export default AutoComplete;