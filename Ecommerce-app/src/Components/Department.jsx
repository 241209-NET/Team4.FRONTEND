
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ListOfItemsDetails from "./ShoppingList";
// import { useEffect } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Department() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  // const [items, setItems] = useState([]);

  // useEffect(
  //         () => {
  //             const itemdata = async () => {
  //                 const itemurl = "http://localhost:5231/api/Item"
  //                 const itemresponse = await fetch(itemurl);
  //                 const resjson = await itemresponse.json();
  //                 setItems(resjson);
  //             };
  //             itemdata();
  //             console.log(items);
  //         }
  //         ,[]);

  return (
    <div>
        <h1>Department List</h1>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* //maybe need to change this to read department names but for now manually entering them should be fine */}
          <Tab label="Books" {...a11yProps(0)} />
          <Tab label="Electronics" {...a11yProps(1)} />
          <Tab label="Kitchen" {...a11yProps(2)} />
          <Tab label="Toiletries" {...a11yProps(3)} />
          <Tab label="Clothing" {...a11yProps(4)} />
          <Tab label="Furniture" {...a11yProps(5)} />
          <Tab label="Groceries" {...a11yProps(6)} />
          <Tab label="Pharmacy" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      item list Department  1      
      {ListOfItemsDetails(1)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      item list Department  2
      {ListOfItemsDetails(2)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      item list Department 3
      {ListOfItemsDetails(3)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      item list Department 4
      {ListOfItemsDetails(4)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      item list Department 5
      {ListOfItemsDetails(5)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
      item list Department 6
      {ListOfItemsDetails(6)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
      item list Department 7
      {ListOfItemsDetails(7)}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
      item list Department 8
      {ListOfItemsDetails(8)}
      </CustomTabPanel>
    </Box>
    </div>
  );
}
