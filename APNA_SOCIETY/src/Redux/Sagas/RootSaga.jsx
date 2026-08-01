import { all } from "redux-saga/effects";

import NoticeSagas from "./NoticeSagas"
import ComplaintSagas from "./ComplaintSagas"
import ResidentSagas from "./ResidentSagas"
import EventsSagas from "./EventsSagas"
import FeatureSagas from "./FeatureSagas"
import FaqSagas from "./FaqSagas"
import SettingSagas from "./SettingSagas"

import NewsletterSagas from "./NewsletterSagas"
import ContactUsSagas from "./ContactUsSagas"
import TestimonialSagas from "./TestimonialSagas"
import UserSagas from "./UserSagas"

export default function* RootSaga() {
    yield all([
        NoticeSagas(),
        ComplaintSagas(),
       ResidentSagas(),
      EventsSagas(),
        FeatureSagas(),
        FaqSagas(),
        SettingSagas(),
      
        NewsletterSagas(),
        ContactUsSagas(),
        TestimonialSagas(),
        UserSagas(),
    ])
}