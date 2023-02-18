import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';

const MyComponent = () => {
    const [rate, setRate] = useState(null);
    const [rateNBU, setRatNBU] = useState(null);

    useEffect(() => {
        axios.get('https://minfin.com.ua/ua/currency/auction/usd/buy/all/')
            .then(response => {
                const $ = cheerio.load(response.data);
                const rate = $('#exchanges-page-container > div > div > div.exchanges-page-header > div > div.chart-button-wrapper > div > div.chart-wrapper > div > div.sale > span').first().text();
                setRate(rate);
            })
            .catch(error => console.error(error));

        axios.get('https://minfin.com.ua/ua/currency/nbu/')
            .then(response => {
                const $ = cheerio.load(response.data);
                const rateNBU = $('#root > div > section > div > div > div > main > section:nth-child(1) > div.sc-1x32wa2-0.dWgyGF > table > tbody > tr:nth-child(1) > td.sc-1x32wa2-8.tWvco > div > p').first().text();
                setRatNBU(rateNBU);
            })
            .catch(error => console.error(error));

    }, []);

    return (
        <View style={styles.container}>
            {rate && rateNBU && (
                <View>
                    <Text style={styles.headerText}>Курс долара на чорному ринку:</Text>
                    <Text style={styles.rateText}>{rate} грн</Text>
                    <Text style={styles.headerText}>Курс долара по НБУ:</Text>
                    <Text style={styles.rateText}>{(rateNBU.slice( 0, -2 ) )} грн</Text>
                </View>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 10,
    },
    rateText: {
        fontSize: 48,
        color: '#ffffff',
        marginBottom: 10,
    },
    exchangeDateText: {
        fontSize: 18,
        color: '#ffffff',
    },
});
export default MyComponent;
