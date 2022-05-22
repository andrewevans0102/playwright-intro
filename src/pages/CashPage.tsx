import '../styles/cash.scss';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Container,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import '../styles/main.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import { squareDate } from '../helper/DollarHelper';
import { ContainerProps, PageProps } from './Page.props';
import { cashResponse } from './CashPage.response';

const useStyles = makeStyles({
    input: {
        height: '100%',
        overflow: 'hidden',
        width: '100%',
    },
    listItem: {
        border: 'solid',
        margin: '5px',
        borderRadius: '10px',
    },
    createButton: {
        backgroundColor: '#013220',
        color: 'black',
    },
    listValues: {
        width: '90%',
    },
    listDelete: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    listDate: {
        padding: '20px',
    },
    cashTotal: {
        textAlign: 'center',
        margin: '40px',
    },
});

const CashPage = (props: PageProps) => {
    const { pageContainer } = props;
    const pageShared: ContainerProps = pageContainer.useContainer();

    const classes = useStyles();

    const [note, setNote] = useState('');
    const [amount, setAmount] = useState('0');
    const [inputOutput, setInputOutput] = useState('IN');
    const [total, setTotal] = useState(0);
    const [cashList, setcashList] = useState<object[]>([]);
    const [loading, setLoading] = useState(false);
    const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());

    const handleChangeDate = (newValue: Date | null) => {
        setPaymentDate(newValue);
    };

    useEffect(() => {
        let cashTotal = tallyTotal();
        setTotal(cashTotal);
    }, [cashList]);

    useEffect(() => {
        const sortedCash = sortCash(cashResponse);
        setcashList(sortedCash);
    }, []);

    const sortCash = (unsortedCash: object[]) => {
        const sortedCash = unsortedCash.sort((a: any, b: any) => {
            if (new Date(a.purchaseDate) < new Date(b.purchaseDate)) {
                return -1;
            }
            if (new Date(a.purchaseDate) > new Date(b.purchaseDate)) {
                return 1;
            }

            return 0;
        });

        return sortedCash;
    };

    const tallyTotal = () => {
        let cashTotal = 0;
        if (cashList !== undefined) {
            cashList.forEach((value: any) => {
                if (value.inputOutput === 'IN') {
                    cashTotal = cashTotal + parseFloat(value.amount);
                } else if (value.inputOutput === 'OUT') {
                    cashTotal = cashTotal - parseFloat(value.amount);
                }
            });
        }
        return cashTotal;
    };

    const changeAmount = (e: any) => {
        e.preventDefault();
        setAmount(e.target.value);
    };

    const changeNote = (e: any) => {
        e.preventDefault();
        setNote(e.target.value);
    };

    const handleChangeInputOutput = (e: any) => {
        e.preventDefault();
        setInputOutput(e.target.value);
    };

    const addItem = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const addedCash = {
                id: paymentDate?.toString(),
                amount: amount,
                purchaseDate: paymentDate,
                note: note,
                inputOutput: inputOutput,
            };

            const localCash = cashList;
            localCash.push(addedCash);

            const sortedCash = sortCash(localCash);

            setcashList([...sortedCash]);
            setAmount('');
            setPaymentDate(new Date());
            setNote('');
        } catch (error) {
            pageShared.setPageError(error);
        }
        setLoading(false);
    };

    const deleteItem = async (id: string) => {
        try {
            setLoading(true);

            try {
                // we do not have to do an API call here since we an remove it from what is shown
                const deleteList = cashList.filter((listValue: any) => {
                    if (listValue.id === id) {
                        return false;
                    } else {
                        return true;
                    }
                });

                setcashList([...deleteList]);
            } catch (error) {
                pageShared.setPageError(error);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {loading === true && (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
            {loading === false && (
                <section className="cash">
                    <h1>Cash Page</h1>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <Container maxWidth="sm">
                            <Typography
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    width: '100%',
                                    fontSize: '40px',
                                }}
                                data-testid="total"
                            >
                                Cash Total: ${total}
                            </Typography>
                            <FormControl className={classes.input}>
                                <FormGroup>
                                    <TextField
                                        placeholder="Amount"
                                        onChange={changeAmount}
                                        value={amount}
                                        inputProps={{
                                            'data-testid': 'amount',
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField
                                        placeholder="Note"
                                        onChange={changeNote}
                                        value={note}
                                        multiline
                                        maxRows={4}
                                        inputProps={{
                                            'data-testid': 'note',
                                        }}
                                    />
                                </FormGroup>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        value={paymentDate}
                                        onChange={handleChangeDate}
                                        className={classes.listDate}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </Stack>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Cash In or Out?
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="cashInOrOut"
                                        name="cashInOrOut"
                                        value={inputOutput}
                                        onChange={handleChangeInputOutput}
                                    >
                                        <FormControlLabel
                                            value="IN"
                                            control={<Radio />}
                                            label="IN"
                                        />
                                        <FormControlLabel
                                            value="OUT"
                                            control={<Radio />}
                                            label="OUT"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    onClick={addItem}
                                    style={{
                                        backgroundColor: '#013220',
                                        color: 'white',
                                    }}
                                    data-testid="create"
                                >
                                    Create Value
                                </Button>
                            </FormControl>
                            <List>
                                {cashList &&
                                    cashList.map((value: any) => {
                                        return (
                                            <ListItem
                                                key={value.id}
                                                className={classes.listItem}
                                                style={
                                                    value.inputOutput === 'IN'
                                                        ? { color: 'green' }
                                                        : { color: 'red' }
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.listValues
                                                    }
                                                >
                                                    <Typography variant="body1">
                                                        PaymentDate:{' '}
                                                        {squareDate(
                                                            value.purchaseDate
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Amount: ${value.amount}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Note: {value.note}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Cash{' '}
                                                        {value.inputOutput.toUpperCase()}
                                                    </Typography>
                                                </div>
                                                <div
                                                    className={
                                                        classes.listDelete
                                                    }
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            deleteItem(value.id)
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <DeleteIcon />
                                                        </ListItemIcon>
                                                    </Button>
                                                </div>
                                            </ListItem>
                                        );
                                    })}
                            </List>
                        </Container>
                    </LocalizationProvider>
                </section>
            )}
        </>
    );
};

export default CashPage;
