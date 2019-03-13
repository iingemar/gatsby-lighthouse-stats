import React, { Component } from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
    render () {
        return (
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                ...
            </div>
        );
    }
};