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
        const seo = map(ligthhouseResults, property('categories.seo.score'));
        const accessibility = map(ligthhouseResults, property('categories.accessibility.score'));

        this.renderChart('performance', labels, performance);
        this.renderChart('pwa', labels, pwa);
        this.renderChart('seo', labels, seo);
        this.renderChart('accessibility', labels, accessibility);
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
                <div className="container text-center">
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <h4>Performance</h4>
                            <canvas id="performance" />
                        </div>
                        <div className="col-sm-6">
                            <h4>Progressive Web App</h4>
                            <canvas id="pwa" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <h4>Accessibility</h4>
                            <canvas id="accessibility" />
                        </div>
                        <div className="col-sm-6">
                            <h4>SEO</h4>
                            <canvas id="seo" />
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
                        seo {
                            title
                            score
                        }
                        accessibility {
                            title
                            score
                        }                                              
                    }
                }
            }
        }
    }
`;