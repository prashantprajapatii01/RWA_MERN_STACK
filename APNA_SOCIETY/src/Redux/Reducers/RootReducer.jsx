import { combineReducers } from "@reduxjs/toolkit";

import NoticeReducer from "./NoticeReducer"
import ComplaintReducer from "./ComplaintReducer"
import ResidentReducer from "./ResidentReducer"

import FeatureReducer from "./FeatureReducer"
import FaqReducer from "./FaqReducer"
import SettingReducer from "./SettingReducer"

import EventsReducer from "./EventsReducer"
import NewsletterReducer from "./NewsletterReducer"
import ContactUsReducer from "./ContactUsReducer"
import TestimonialReducer from "./TestimonialReducer"
import UserReducer from "./UserReducer"

export default combineReducers({
    NoticeStateData: NoticeReducer,
    ComplaintStateData: ComplaintReducer,
    ResidentStateData: ResidentReducer,
   EventsStateData: EventsReducer,
    FeatureStateData: FeatureReducer,
    FaqStateData: FaqReducer,
    SettingStateData: SettingReducer,
 
    NewsletterStateData: NewsletterReducer,
    ContactUsStateData: ContactUsReducer,
    TestimonialStateData: TestimonialReducer,
    UserStateData: UserReducer,
})