import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import PortalWindow from './portal_window'
import './custom.css'
const AWS = require('aws-sdk')
const moment = require('moment')

const AWS_ACCESS_KEY_ID = 'AKIAJSSV2U7WEB6EDUKA'
const AWS_SECRET_ACCESS_KEY = '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'

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
})

export default class Data extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            showWindowPortal: false,
            authWithHubspot: false,
            message: '',
            counter: 0,
            name: '',
            s3ListItems: []
        }

        this.readFiles = this.readFiles.bind(this)
        this.gathers3Files = this.gathers3Files.bind(this)
    }

    static propTypes = {
        defaultColumnStyle: PropTypes.instanceOf(Object),
        account: PropTypes.instanceOf(Object),
        history: PropTypes.instanceOf(Object)
    }

    componentWillMount () {
        /*
            axios('http://localhost:5000/auth/credentials')
                .then(({ data }) => {
                    if (Object.keys(data).length > 0) {
                        this.setState({ authWithGoogle: true })
                    }
                })
                .catch(err => {
                    console.log('===== ERROR =====\n', err)
                })
            */

        this.gathers3Files()
        this._getAccessToken()
    }

    _getAccessToken () {
        axios('http://localhost:5000/importer/hubspot/oauth/credentials')
            .then(() => {
                console.log('querying to see if we are authenticated')
                // TO-DO: Find data
            })
            .catch(err => {
                console.log('===== ERROR =====\n', err)
            })
    }
    gathers3Files = () => {
        return new Promise((resolve, reject) => {
            const s3params = {
                Bucket: 'influentdevtest',
                MaxKeys: 20,
                Delimiter: '/'
            }
            const s3 = new AWS.S3()

            s3.listObjectsV2(s3params, (err, data) => {
                if (err) {
                    reject(err)
                    console.log('Mounting error:', err)
                }
                resolve(data)
                console.log('S3 bucket list:', data)
                console.log(data.Contents)

                this.setState({
                    _s3ListItems: data.Contents,
                    get s3ListItems () {
                        return this._s3ListItems
                    },
                    set s3ListItems (value) {
                        this._s3ListItems = value
                    }
                })
            })
        })
    };

    readFiles = e => {
        const { files } = e.target
        Array.from(files).map((file, i) => {
            const reader = new window.FileReader()

            reader.onload = e => {
                const s3 = new AWS.S3()
                s3.putObject({
                    Bucket: 'influentdevtest',
                    Key: file.name,
                    Body: e.target.result,
                    ACL: 'public-read'
                },
                function (resp) {
                    console.log('successfully upload...', resp)
                }
                )
                const id = `import_user_date_${i}`
                // setting the name of the file to write it to the ui
                this.setState({ name: file.name })
                this.setState({[id]: {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    body: e.target.result
                }
                })
            }
            reader.readAsArrayBuffer(file)
        })
    }
    readFiles = e => {
        const { files } = e.target
        Array.from(files).map((file, i) => {
            const { name, size, type } = file
            const reader = new window.FileReader()
            reader.onload = e => {
                // TO-DO: accommodate multiple files, react-dropzone, progress bar while uploading
                // rather than setting state, probably want to store these in instance array, to avoid potential race condition
                this.setState({
                    file: {
                        name,
                        size,
                        type,
                        body: e.target.result
                    }
                })
            }
            reader.readAsArrayBuffer(file)
        })
    }

    _uploadFile = url => {
        const options = { headers: { 'Content-Type': this.state.file.type } }
        axios.put(url, this.state.file.body, options)
            .then(r => console.log('success', r))
            .catch(err => { console.error(err) })
    }

    _onUploadClick = e => {
        e.preventDefault()
        const url = 'http://localhost:5000/importer/data/getUploadUrl'
        const { type, name } = this.state.file
        const data = { org: this.props.account.org.id, type, name }
        axios.post(url, data)
            .then(r => {
                const { url } = r.data
                this._uploadFile(url)
            })
    }

  _closeAuth = () => {
      console.log(' closing auth ')
      this.setState({ showAuth: false })
  };

  loginCallback = data => {
      console.log({ callback: data })
      // Stash credentials for now.. won't need this in the future as server will retain credentials
      window.localStorage.setItem('hubspotAccessToken', data.hubspotAccessToken)
      window.localStorage.setItem(
          'hubspotRefreshToken',
          data.hubspotRefreshToken
      )
      this.setState({ authWithHubSpot: true })
  };

  toggleWindowPortal () {
      this.setState({
          url: 'http://localhost:5000/importer/hubspot/oauth',
          showWindowPortal: true
      })
  }

  render () {
      return (
          <div
              className="right_col"
              role="main"
              style={this.props.defaultColumnStyle}
          >
              <div className="clear">
                  <h1>Data</h1>
              </div>
              <div className="clear">
                  {this.state.authWithHubSpot ? null : (
                      <a onClick={this.toggleWindowPortal.bind(this)}>
              Log in with HubSpot
                      </a>
                  )}
              </div>
              {/* form - browse and upload page formatting */}
              <form>
                  <div className="row">
                      <div className="col-lg-6 col-sm-6 col-12">
                          <h2>Upload</h2>
                          <div className="input-group">
                              <input
                                  value={this.state.name} // writing the name of the file received from readFiles function
                                  type="text"
                                  className="form-control"
                                  readOnly
                              />
                              <label className="input-group-btn">
                                  <span className="btn btn-primary  btn_file">
                                      <input
                                          type="file"
                                          value=""
                                          className="btn_file"
                                          onChange={this.readFiles}
                                          multiple
                                      />
                                    BROWSE
                                  </span>
                              </label>
                          </div>
                          <div className="input-group">
                              <button
                                  onClick={this._onUploadClick}
                                  value={this.state.file}
                                  className="btn btn-default btn_file"
                                  disabled={!this.state.file}
                              >
                                UPLOAD
                              </button>
                          </div>
                      </div>
                  </div>
              </form>
              <h2>Folder Sync</h2>
              <div className="container">
                  <table className="table table-bordered">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Last Modified</th>
                              <th>Sync Type</th>
                              <th>Next Sync Time</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.s3ListItems.map(item => (
                              <tr key={item.ETag}>
                                  <td>{item.Key}</td>
                                  <td>s3 Bucket</td>
                                  <td>{moment(item.LastModified).format('MM/DD, HH:mma')}</td>
                                  <td>no data</td>
                                  <td>no data</td>
                                  <td><input type="button" value="+" /></td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
              {this.state.showWindowPortal && (
                  <PortalWindow url={this.state.url} _callback={this.loginCallback}>
                      <button onClick={() => this.setState({ showWindowPortal: false })}>
              Close me!
                      </button>
                  </PortalWindow>
              )}
        ;
          </div>
      )
  }
}
