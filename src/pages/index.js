import React, { Component } from "react";
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet";
import Chart from 'chart.js';
import { map, property } from 'lodash';

export default class IndexPage extends Component {

    componentDidMount() {
        let { allDataJson } = this.props.data;
        const ligthhouseResults = allDataJson.edges.map(e => e.node);

        const labels = map(ligthhouseResults, property('fetchTime'));
        const performance = map(ligthhouseResults, property('categories.performance.score'));
        const pwa = map(ligthhouseResults, property('categories.pwa.score'));

        this.renderChart('performance', labels, performance);
        this.renderChart('pwa', labels, pwa);
    }

    renderChart(elementId, labels, data) {
        const ctx = document.getElementById(elementId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: elementId,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 1
                        }
                    }]
                }
            }
        });
    }

    render() {
        return(
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>gatsby-lighthouse-stats</title>
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                          crossOrigin="anonymous" />
                </Helmet>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Performance</h2>
                            <canvas id="performance" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Progressive Web App</h2>
                            <canvas id="pwa" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const query = graphql`
    query {
        allDataJson {
            edges {
                node {
                    requestedUrl
                    fetchTime
                    categories {
                        performance {
                            title
                            score
                        }
                        pwa {
                            title
                            score
                        }
                        
                    }
                }
            }
        }
    }
`;