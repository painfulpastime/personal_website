---
title: From forecast to decision
subtitle: Does a better forecast make a better decision?
description: Revisiting electricity-demand forecasting through the decisions it informs—and the cost of getting those decisions wrong.
category: Power systems / Research
year: "2024 · revised in 2026"
order: 2
tags: [Python, Forecasting, Optimisation]
cover: thesis
---

## Looking beyond forecast accuracy

My undergraduate project examined short-term electricity-demand forecasting for
the off-grid Rye microgrid near Trondheim, Norway. Its mix of wind, solar,
battery and hydrogen storage, and backup generation makes forecasting an
operational question as well as a modelling problem.

The 2026 revision asks a further question: if one model predicts demand more
accurately, does using that forecast actually reduce the cost of operating the
system?

## The comparison

The revised analysis compares simple historical baselines, SARIMA, LightGBM, and
LSTM models under chronological day-ahead evaluation. Each forecast predicts
the next day's 24 hourly loads using information available at the forecast origin.

Forecasts then feed a dispatch model. Sensitivity studies examine battery size
and backup-generation cost, followed by probabilistic forecasting and
uncertainty-aware scheduling.

## A useful result

In the saved results for the 550 kWh battery scenario, the seven-day same-hour
mean achieves a mean absolute error of about **2.42 kW**, while a level-relative,
monthly-refitted LightGBM model achieves about **2.34 kW**.

Yet their simulated operating costs over the 71-day test period are about
**37.62 kNOK** and **37.70 kNOK**, respectively. The slightly more accurate model
does not produce the cheaper operating outcome in that scenario.

> A forecast's value depends on the decision it supports, the cost of correcting
> it, and the flexibility available in the system.

That distinction is the centre of this project: evaluate modelling choices
against operating decisions, not just a prediction leaderboard.

## What the findings can—and cannot—tell us

These are saved simulation results from one site and 71 autumn test days, not
measured cost savings from an operational deployment. Economic parameters are
assumed, renewable generation is treated as known day-ahead, and the operating
model simplifies real equipment constraints.

Some later scheduling-rule design used observations from the test period and
needs confirmation on new data. The conclusions therefore belong to this
experimental setting rather than to all microgrids or forecasting problems.

## A project revisited

The original thesis was submitted in 2024. This case study describes its 2026
research revision, which rebuilds the evaluation and extends the work toward
operating value and uncertainty. The full revised document is not published here.
