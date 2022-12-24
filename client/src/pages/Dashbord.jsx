import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {
    AppCurrentVisits,
    AppWebsiteVisits,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@Dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const theme = useTheme();

    return (
        <>
            <Helmet>
                <title> Dashboard | Enrollis </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome to Enrollis
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Number of tutors" total={3} icon={'ant-design:eye-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Number of students" total={10} color="info" icon={'ant-design:fire-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Hours Worked" total={0} color="warning" icon={'ant-design:dashboard-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Packages Created" total={0} color="error" icon={'ant-design:file-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits
                            title="Website Visits"
                            subheader="Frequency by user"
                            chartLabels={[
                                '01/12/2022',
                                '02/12/2022',
                                '03/12/2022',
                                '04/12/2022',
                                '05/12/2022',
                                '06/12/2022',
                                '07/12/2022',
                                '08/12/2022',
                                '09/12/2022',
                                '10/12/2022',
                                '11/12/2022',
                            ]}
                            chartData={[
                                {
                                    name: 'Students',
                                    type: 'column',
                                    fill: 'solid',
                                    data: [10, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                {
                                    name: 'Tutors',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [2, 3, 3, 6, 3, 3, 6, 4, 5, 2, 4],
                                },
                                {
                                    name: 'Admins',
                                    type: 'line',
                                    fill: 'solid',
                                    data: [2, 2, 3, 3, 4, 3, 4, 2, 2, 3, 3],
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title="Packages Focus Rates"
                            chartData={[
                                { label: 'SAT', value: 5435 },
                                { label: 'TOEFL', value:  1443},
                                { label: 'Essay Writing', value: 4344 },
                                { label: 'English', value: 4443 },
                            ]}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Conversion Rates"
                            subheader="Our activities flowchart"
                            chartData={[
                                { label: 'TOEFL', value: 400 },
                                { label: 'Essay Writing', value: 690 },
                                { label: 'English', value: 1100 },
                                { label: 'SAT', value: 1380 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Subjects Flowchart"
                            chartLabels={['Reading', 'Mathematics', 'Listening', 'Writing', 'Speaking', 'Physics']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}