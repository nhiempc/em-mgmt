import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            style={{ width: '100%' }}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const TabContext = ({
    componentOne,
    componentTwo,
    componentThee,
    labelOne = 'item1',
    labelTwo = 'item2',
    labelThree = 'item3'
}) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex'
                }}
            >
                <Tabs
                    orientation='vertical'
                    variant='scrollable'
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        minWidth: '200px'
                    }}
                >
                    <Tab label={labelOne} {...a11yProps(0)} />
                    {componentTwo && <Tab label={labelTwo} {...a11yProps(1)} />}
                    {componentThee && (
                        <Tab label={labelThree} {...a11yProps(2)} />
                    )}
                </Tabs>

                <TabPanel value={value} index={0}>
                    {componentOne}
                </TabPanel>
                {componentTwo && (
                    <TabPanel value={value} index={1}>
                        {componentTwo}
                    </TabPanel>
                )}
                {componentThee && (
                    <TabPanel value={value} index={2}>
                        {componentThee}
                    </TabPanel>
                )}
            </Box>
        </>
    );
};

export default TabContext;
