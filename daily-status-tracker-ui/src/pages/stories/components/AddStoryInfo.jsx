import React from 'react'
import styles from '../styles/stories.module.scss'
import moment from 'moment'
import copy from '../locale/stories.locale.en-US'
import { Input, Select, DatePicker, Switch } from 'antd'
import pairsDev from '../constants/pairsDev'
import getOptionsForPairsDev from '../helpers/get_options_for_pairs_dev'
import PropTypes from 'prop-types'
import storyPointsOption from '../constants/story_points_dropdown_value'
import isAlphaNumeric from '../../../shared/is_alpha_numeric'
import isValidNumber from '../../../shared/is_valid_number'
import validateEndDate from '../helpers/validate_end_date'
import getFilteredPairDevOptions from '../helpers/get_filtered_pairs_dev_option'

const { TextArea } = Input
const { Option } = Select

class AddStoryInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isTouchedStoryNo: false,
            isTouchedName: false,
            isTouchedStatus: false,
            isTouchedStartDate: false,
            isTouchedPoints: false,
            isTouchedReleaseVersion: false,
            isValidStoryNo: true,
            isValidReleaseVersion: true

        }
        this.userId = localStorage.getItem('userId')
    }

    clearTouchedField = () => {
        this.setState({
            isTouchedStoryNo: false,
            isTouchedName: false,
            isTouchedStatus: false,
            isTouchedStartDate: false,
            isTouchedPoints: false,
            isTouchedReleaseVersion: false,
            isValidStoryNo: true,
            isValidReleaseVersion: true
        })
    }

    validateInput = (input) =>{
        this.setState({
          isValidStoryNo: isAlphaNumeric(input)
        })
    }

    numberValidation = (input) => {
        this.setState({
            isValidReleaseVersion: isValidNumber(input)
        })
    }

    render() {
        const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
        const {
            handleStoryNoChange,
            storiesDetail,
            handleStoryNameChange,
            handleStatusChange,
            handleStartDateChange,
            handleEndDateChange,
            handleStoryPointsChange,
            handleReleaseVersionChange,
            handlePairsDevChange,
            handleOffshoreTesterChange,
            disableStartDate
        } = this.props

        const { isTouchedStoryNo,
            isTouchedName,
            isTouchedStatus,
            isTouchedStartDate,
            isTouchedPoints,
            isTouchedReleaseVersion,
            isValidStoryNo,
            isValidReleaseVersion } = this.state
        const children = []
        const pairsDevArray = getOptionsForPairsDev({ options: pairsDev })
        const filteredPairsDevArray = getFilteredPairDevOptions({pairsDevArray,userId:this.userId})
        filteredPairsDevArray.map(pairs =>
            children.push(<Option key={pairs.value} value={pairs.label}>{pairs.label}</Option>))
        return (
            <form name="add-stories" className={styles.storyInfo}>

                <label
                    htmlFor='storyNo'
                    className={(isTouchedStoryNo && !storiesDetail.storyNo) ? styles.errMsg : ''} >{copy.STORY_NUMBER}</label>
                <Input id='storyNo'
                    placeholder={copy.STORY_NUMBER}
                    value={storiesDetail.storyNo}
                    disabled={disableStartDate}
                    onChange={handleStoryNoChange}

                    onBlur={() => {
                        this.setState({
                            isTouchedStoryNo: true,
                            isValidStoryNo: isAlphaNumeric(this.props.storiesDetail.storyNo)

                        })
                    }}
                />
                {(isTouchedStoryNo && !storiesDetail.storyNo) &&
                    <span className={styles.errMsg}>{copy.STORY_NUMBER_ERR_MSG}</span>}
                { !isValidStoryNo && <span className={styles.errMsg}>{copy.STORY_NUMBER_VALIDATION_MSG}</span>}
                <label className={styles.mtl}>{copy.STORY_DESC}</label>
                <TextArea
                    onChange={handleStoryNameChange}
                    placeholder={copy.STORY_DESC}
                    autoSize={{ minRows: 2, maxRows: 5 }}
                    value={storiesDetail.name}
                    onBlur={() => {
                        this.setState({
                            isTouchedName: true
                        })
                    }}
                />
                {(isTouchedName && !storiesDetail.name) &&
                    <span className={styles.errMsg}>{copy.STORY_DESC_ERR_MSG}</span>}

                <label className={styles.mtl}>{copy.STORY_POINTS}</label>

                <Select
                    placeholder={copy.STORY_POINTS}
                    id='story-points'
                    onChange={handleStoryPointsChange}
                    value={storiesDetail.points}
                    onBlur={() => {
                        this.setState({
                            isTouchedPoints: true
                        })
                    }}
                >
                    {
                        storyPointsOption.map(item =>
                            <Select.Option value={item}>{item}</Select.Option>)
                    }
                </Select>
                {(isTouchedPoints && storiesDetail.points === '') &&
                    <span className={styles.errMsg}>{copy.STORY_POINTS_ERR_MSG}</span>}

                <label className={styles.mtl}>{copy.START_DATE}</label>
                <DatePicker
                    placeholder={copy.START_DATE}
                    onChange={handleStartDateChange}
                    value={storiesDetail.startDate}
                    disabled={disableStartDate}
                    defaultValue={moment('01/01/2015', dateFormatList[0])}
                    format={dateFormatList}
                    onBlur={() => {
                        this.setState({
                            isTouchedStartDate: true
                        })
                    }}
                />
                {(isTouchedStartDate && !storiesDetail.startDate) &&
                    <span className={styles.errMsg}>{copy.START_DATE_ERR_MSG}</span>}
                <label className={styles.mtl}>{copy.END_DATE}</label>
                <DatePicker
                    placeholder={copy.END_DATE_PLACEHOLDER}
                    onChange={handleEndDateChange}
                    value={storiesDetail.endDate}
                    defaultValue={moment('01/01/2015', dateFormatList[0])}
                    format={dateFormatList}
                    />
                    {
                        validateEndDate({endDate:storiesDetail.endDate,startDate:storiesDetail.startDate}) && <span className={styles.errMsg}>{copy.END_DATE_VALIDATION_MSG}</span>
                    }


                <label className={styles.mtl}>{copy.STATUS}</label>
                <Select placeholder={copy.STATUS}
                    onChange={handleStatusChange}
                    value={storiesDetail.status}
                    onBlur={() => {
                        this.setState({
                            isTouchedStatus: true
                        })
                    }}
                >
                    <Select.Option value="">select</Select.Option>
                    <Select.Option value="In - Progress">In - Progress</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                    <Select.Option value="On Hold">On Hold</Select.Option>
                </Select>

                {(isTouchedStatus && !storiesDetail.status) &&
                    <span className={styles.errMsg}>{copy.STATUS_ERR_MSG}</span>}
                <label className={styles.mtl}>{copy.RELEASE_VERSION}</label>

                <Input
                    placeholder={copy.RELEASE_VERSION}
                    id='release-version'
                    value={storiesDetail.releaseVersion}
                    onChange={handleReleaseVersionChange}
                    onBlur={() => {
                        this.setState({
                            isTouchedReleaseVersion: true
                        })
                    }}
                />

                {(isTouchedReleaseVersion && !storiesDetail.releaseVersion) &&
                    <span className={styles.errMsg}>{copy.RELEASE_VERSION_ERR_MSG}</span>}
                     {!isValidReleaseVersion && 
                    <span className={styles.errMsg}>{copy.RELEASE_VERSION_VALIDATION_MSG}</span>}


                <label className={styles.mtl}>{copy.PAIR_DEV}</label>


                <Select
                    mode="multiple"
                    allowClear
                    onChange={handlePairsDevChange}
                    value={storiesDetail.pairsDev}
                    placeholder={copy.PAIR_DEV_PLACEHOLDER}
                >
                    {children}
                </Select>

                <div className={styles.tester}>
                    <label>{copy.OFFSHORE_TESTER}</label>
                    <Switch checked={storiesDetail.isOffshoreTester} onChange={handleOffshoreTesterChange}
                    />
                </div>


            </form>

        )
    }
}

AddStoryInfo.propTypes = {
    handleStoryNoChange: PropTypes.func,
    storiesDetail: PropTypes.object,
    handleStoryNameChange: PropTypes.func,
    handleStatusChange: PropTypes.func,
    handleStartDateChange: PropTypes.func,
    handleEndDateChange: PropTypes.func,
    handleStoryPointsChange: PropTypes.func,
    handleReleaseVersionChange: PropTypes.func,
    handlePairsDevChange: PropTypes.func,
    handleOffshoreTesterChange: PropTypes.func,
}

AddStoryInfo.defaultProps = {
    disableStartDate: false
}

export default AddStoryInfo