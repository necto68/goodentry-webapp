import tw from "twin.macro";

export const Container = tw.div`flex flex-col w-full gap-4 p-4 bg-bg-primary border border-bg-secondary rounded`;

export const Title = tw.h2`text-sm font-medium text-white`;

export const AccentValue = tw.h2`text-2xl font-medium font-semibold text-brand`;

export const MetricsRow = tw.div`flex flex gap-2 justify-between pr-8`;

export const APRRow = tw.div`flex flex gap-6 pr-8`;

export const Metric = tw.div`flex flex-col gap-2`;

export const MetricTitle = tw.h4`text-base font-medium text-white`;

export const MetricValue = tw.h4`text-base font-medium text-white`;

export const MetricValueAccent = tw.h4`text-base font-medium text-brand`;
