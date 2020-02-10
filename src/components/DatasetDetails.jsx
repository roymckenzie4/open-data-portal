import React from 'react';
import Linkify from 'react-linkify';
import ReactHtmlParser from 'react-html-parser';
import './styles.css';
import locationIcon from './locationIcon.png';
import buildingIcon from './buildingIcon.png';
import dollarIcon from './dollarIcon.png';
import briefcaseIcon from './briefcaseIcon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DatasetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    axios.get('https://open-data-portal.s3.us-east-2.amazonaws.com/metadata.json')
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result.data,
        });
        console.log('here');
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ) 
  }

  render() {
    if (this.state.items.length === 0) {
      return <div>Loading...</div>;
    } else {
    return (
      <div className="datasetDetails">
        <div className="mainContent">
          {this.state.items && this.state.items.map((post) =>
              post.name === this.props.match.params.name &&
              <div>
                <div className="datasetFacts">
                  <div>
                    <p className = "datasetTitle"> {post.display_name} </p>
                    <div><img src={dollarIcon} alt="" /> <b> Categories:</b> {post.tags} </div>
                    <div><img src={locationIcon} alt="" /> <b> Upload Date:</b> {post.create_date} </div>
                    <br></br>
                    <div> {post.description} </div>
                    <br></br>
                    <br></br>
                    <div>
                      <a href={post.source_url} target="_blank" className="btnSecondary">View Source</a>
                      <a> </a>
                      <a href={"https://s3.us-east-2.amazonaws.com/open-data-portal/" + this.props.match.params.name + ".csv"} className="btnSecondary">Download CSV</a>
                    </div>

                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}
}

export default DatasetDetails;